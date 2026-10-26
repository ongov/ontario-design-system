import { Component, Element, h, Method, Prop, State, Watch } from '@stencil/core';
import {
	ErrorAwareControl,
	errorControlTags,
	ensureErrorControlAnchor,
	FormControlError,
	setErrorAlertActive,
} from '../../utils/form-error';
import { ConsoleMessageClass } from '../../utils/console-message/console-message';
import { Language } from '../../utils/common/language-types';
import translations from '../../translations/global.i18n.json';

interface ErrorAlertEntry extends FormControlError {
	control: ErrorAwareControl;
}

/**
 * Collects supported ODS control errors within a native form.
 * Applications own validation and explicitly activate the summary after validation.
 */
@Component({
	tag: 'ontario-error-alert',
	styleUrl: 'ontario-error-alert.scss',
	shadow: true,
})
export class OntarioErrorAlert {
	@Element() element: HTMLElement;

	/**
	 * The ID of the native form whose ODS control errors this summary displays.
	 */
	@Prop() formId?: string;

	/**
	 * The summary heading.
	 */
	@Prop() heading?: string;

	/**
	 * The language for the built-in heading.
	 */
	@Prop() language: Language = 'en';

	/** Normalizes rendered text and language metadata without rewriting the public prop. */
	@State() private effectiveLanguage: Language = 'en';

	/** Tracks explicit application activation independently of whether errors currently exist. */
	@State() private active = false;

	/** Retains control references for error updates, ordering and native-field focus. */
	@State() private entries: ErrorAlertEntry[] = [];

	/** null means no live update; an empty string announces a correction. */
	@State() private announcementMessage: string | null = null;

	/** Switches the initial alert to a region after focus, leaving later updates to the status. */
	@State() private summaryAnnounced = false;

	private form?: HTMLFormElement;
	private controls = new Set<ErrorAwareControl>();
	private diagnosedWhitespaceErrors = new WeakSet<ErrorAwareControl>();
	// Per-control generations prevent pending snapshots from overwriting newer error events.
	private eventVersions = new WeakMap<ErrorAwareControl, number>();
	private observer?: MutationObserver;
	private scheduled = false;
	private lastAssociationWarning = '';
	// Keeps activation open when show() precedes application-provided error updates.
	private activationPending = false;
	// Prevents snapshot reconciliation and show() from both scheduling initial focus.
	private isShowing = false;
	// Distinguishes first connection from reconnection after componentDidLoad().
	private loaded = false;
	// Invalidates pending snapshot batches on a newer refresh or disconnection.
	private refreshVersion = 0;

	@Watch('formId')
	handleFormIdChange() {
		void this.refresh();
	}

	@Watch('language')
	handleLanguageChange() {
		this.effectiveLanguage = this.language === 'fr' ? 'fr' : 'en';
	}

	componentWillLoad() {
		this.handleLanguageChange();
	}

	componentDidLoad() {
		this.loaded = true;
		this.startObserving();
	}

	connectedCallback() {
		// Initial discovery waits for rendering; reconnecting must restore the observer.
		if (this.loaded) this.startObserving();
	}

	private startObserving() {
		if (typeof MutationObserver !== 'undefined' && typeof document !== 'undefined') {
			this.observer = new MutationObserver((mutations) => {
				if (mutations.some((mutation) => this.isRelevantMutation(mutation))) this.scheduleRefresh();
			});
			this.observer.observe(document.documentElement, {
				childList: true,
				subtree: true,
				attributes: true,
				attributeFilter: ['id', 'form'],
			});
		}
		void this.refresh();
	}

	disconnectedCallback() {
		// Invalidate pending snapshots before releasing listeners and announcement ownership.
		this.refreshVersion++;
		this.observer?.disconnect();
		this.observer = undefined;
		for (const control of this.controls) {
			control.removeEventListener('inputErrorOccurred', this.handleControlError);
			setErrorAlertActive(control, false, this);
		}
		this.controls.clear();
		this.form?.removeEventListener('reset', this.handleFormReset);
		this.form = undefined;
		this.updateEntries([]);
	}

	/**
	 * Activates aggregation and focuses a non-empty summary without validating controls.
	 * If no errors exist yet, the first arriving error completes activation.
	 */
	@Method()
	async show(): Promise<void> {
		this.active = true;
		this.summaryAnnounced = false;
		this.announcementMessage = null;
		this.activationPending = true;
		this.isShowing = true;
		await this.refresh();
		this.isShowing = false;
		if (this.entries.length) {
			this.activationPending = false;
			await this.focusSummary();
		}
	}

	/**
	 * Hides the summary without clearing control errors and releases inline announcement suppression.
	 * Focus inside the summary returns to its associated control before removal.
	 */
	@Method()
	async hide(): Promise<void> {
		const activeElement = this.element.shadowRoot?.activeElement;
		if (activeElement) {
			const anchor = activeElement instanceof HTMLAnchorElement ? activeElement : undefined;
			const controlId = anchor?.dataset.controlId;
			const entry = this.entries.find((candidate) => candidate.controlId === controlId) ?? this.entries[0];
			await entry?.control.focusError?.();
		}
		this.active = false;
		this.activationPending = false;
		this.summaryAnnounced = false;
		this.announcementMessage = null;
		for (const control of this.controls) setErrorAlertActive(control, false, this);
	}

	/**
	 * Rediscovers associated ODS controls and reconciles their current error snapshots.
	 * Newer refreshes and error events take precedence over pending snapshots.
	 */
	@Method()
	async refresh(): Promise<void> {
		const refreshVersion = ++this.refreshVersion;
		if (!this.element.isConnected) return;
		const form = this.resolveForm();
		if (form !== this.form) {
			for (const control of this.controls) {
				control.removeEventListener('inputErrorOccurred', this.handleControlError);
				setErrorAlertActive(control, false, this);
			}
			this.controls.clear();
			this.form?.removeEventListener('reset', this.handleFormReset);
			this.updateEntries([]);
			this.form = form;
			this.form?.addEventListener('reset', this.handleFormReset);
		}

		if (!form) {
			this.updateEntries([]);
			return;
		}

		const currentControls = this.getFormControls(form);
		const currentSet = new Set(currentControls);

		for (const control of this.controls) {
			if (!currentSet.has(control)) {
				control.removeEventListener('inputErrorOccurred', this.handleControlError);
				setErrorAlertActive(control, false, this);
				this.eventVersions.set(control, (this.eventVersions.get(control) ?? 0) + 1);
				this.setControlEntry(control, null);
			}
		}
		for (const control of currentControls) {
			if (!this.controls.has(control)) {
				control.addEventListener('inputErrorOccurred', this.handleControlError);
			}
		}
		this.controls = currentSet;
		for (const control of currentControls) setErrorAlertActive(control, this.active, this);

		const snapshots = currentControls.map(async (control) => {
			// Capture both generations so asynchronous hydration cannot restore stale errors.
			const version = this.eventVersions.get(control) ?? 0;
			const getErrorState = control.getErrorState;
			if (typeof getErrorState !== 'function') return;

			const state = await getErrorState.call(control);
			if (
				refreshVersion !== this.refreshVersion ||
				version !== (this.eventVersions.get(control) ?? 0) ||
				!this.controls.has(control)
			)
				return;
			this.setControlEntry(control, state);
		});
		await Promise.all(snapshots);
		if (refreshVersion === this.refreshVersion) this.sortEntries(currentControls);
	}

	private isErrorControl(element: Element): element is ErrorAwareControl {
		return errorControlTags.includes(element.localName as (typeof errorControlTags)[number]);
	}

	private resolveForm(): HTMLFormElement | undefined {
		if (this.formId) {
			const target = document.getElementById(this.formId);
			if (target instanceof HTMLFormElement) {
				this.lastAssociationWarning = '';
				return target;
			}
			this.warnAssociation(`No form with id "${this.formId}" was found.`);
			return undefined;
		}

		const form = this.element.closest('form');
		if (form) {
			this.lastAssociationWarning = '';
			return form;
		}
		this.warnAssociation('Set form-id or place ontario-error-alert inside a native form.');
		return undefined;
	}

	private warnAssociation(messageText: string) {
		if (this.lastAssociationWarning === messageText) return;
		this.lastAssociationWarning = messageText;
		new ConsoleMessageClass()
			.addDesignSystemTag()
			.addMonospaceText(' <ontario-error-alert> ')
			.addRegularText(messageText)
			.printMessage();
	}

	private handleControlError = (event: Event) => {
		const control = event.currentTarget as ErrorAwareControl;
		// A nested component's bubbling event does not describe this control's error.
		if (event.target !== control) return;
		const message = (event as CustomEvent<{ errorMessage?: string }>).detail?.errorMessage ?? '';
		this.eventVersions.set(control, (this.eventVersions.get(control) ?? 0) + 1);
		if (!this.controls.has(control) || !this.form || !this.getFormControls(this.form).includes(control)) return;

		if (!message) {
			if (this.active && this.summaryAnnounced) this.announcementMessage = message;
			this.setControlEntry(control, null);
			return;
		}
		if (!message.trim()) {
			this.warnWhitespaceError(control);
			this.setControlEntry(control, null);
			return;
		}
		if (this.active && this.summaryAnnounced) this.announcementMessage = message;

		const anchorId = ensureErrorControlAnchor(control);
		const controlId = this.readControlId(control) || anchorId;
		this.setControlEntry(control, { controlId, message, anchorId });
		this.sortEntries(this.getFormControls(this.form));
	};

	private warnWhitespaceError(control: ErrorAwareControl) {
		if (this.diagnosedWhitespaceErrors.has(control)) return;
		this.diagnosedWhitespaceErrors.add(control);
		new ConsoleMessageClass()
			.addDesignSystemTag()
			.addMonospaceText(' <ontario-error-alert> ')
			.addRegularText(
				'A whitespace-only control error remains invalid but is omitted from the error alert because it has no accessible link text. Supply meaningful error text or an empty string to clear it.',
			)
			.printMessage();
	}

	private getFormControls(form: HTMLFormElement): ErrorAwareControl[] {
		// Form-associated hosts include external controls; descendants cover hosts before hydration.
		const controls = new Set(
			Array.from(form.elements ?? []).filter((element): element is ErrorAwareControl => this.isErrorControl(element)),
		);

		for (const tag of errorControlTags) {
			for (const control of Array.from(form.querySelectorAll<ErrorAwareControl>(tag))) {
				const formAttribute = control.getAttribute('form');
				if (formAttribute ? formAttribute === form.id : control.closest('form') === form) controls.add(control);
			}
		}

		return Array.from(controls);
	}

	private handleFormReset = () => {
		setTimeout(() => void this.refresh(), 0);
	};

	private readControlId(control: ErrorAwareControl): string {
		const id = (control as ErrorAwareControl & { elementId?: string }).elementId;
		return typeof id === 'string' ? id : '';
	}

	private setControlEntry(control: ErrorAwareControl, error: FormControlError | null) {
		if (error && !error.message.trim()) {
			this.warnWhitespaceError(control);
			error = null;
		}
		const next = this.entries.filter((entry) => entry.control !== control);
		if (error) {
			// Keep an existing keyed link in place so message edits do not disrupt focus.
			const previousIndex = this.entries.findIndex((entry) => entry.control === control);
			if (previousIndex >= 0) next.splice(previousIndex, 0, { ...error, control });
			else next.push({ ...error, control });
		}
		this.updateEntries(next);
	}

	private sortEntries(orderedControls: ErrorAwareControl[]) {
		const order = new Map(orderedControls.map((control, index) => [control, index]));
		this.updateEntries(
			[...this.entries].sort((a, b) => (order.get(a.control) ?? Infinity) - (order.get(b.control) ?? Infinity)),
		);
	}

	private updateEntries(next: ErrorAlertEntry[]) {
		const previous = this.entries;
		const unchanged =
			previous.length === next.length &&
			previous.every(
				(entry, index) =>
					entry.control === next[index].control &&
					entry.controlId === next[index].controlId &&
					entry.anchorId === next[index].anchorId &&
					entry.message === next[index].message,
			);
		if (unchanged) return;

		const activeElement = this.element.shadowRoot?.activeElement;
		const isSummaryFocused = !!activeElement;
		const focusedLink = activeElement instanceof HTMLAnchorElement && isSummaryFocused ? activeElement : null;
		const focusedControlId = focusedLink?.dataset.controlId;
		const oldIndex = focusedControlId ? previous.findIndex((entry) => entry.controlId === focusedControlId) : 0;

		this.entries = next;
		if (!this.active) return;
		if (this.activationPending && !this.isShowing && !previous.length && next.length) {
			this.activationPending = false;
			void this.focusSummary();
			return;
		}
		if (!isSummaryFocused) return;

		const stillPresent = focusedControlId && next.some((entry) => entry.controlId === focusedControlId);
		if (stillPresent) return;
		if (!focusedLink && next.length) return;

		const fallback = next[oldIndex] ?? next[oldIndex - 1];
		void this.nextFrame().then(async () => {
			// Rendering may remove the focused link; recover only if focus was not moved elsewhere.
			if (!this.active || !this.element.isConnected) return;
			const currentFocus = this.element.shadowRoot?.activeElement;
			if (currentFocus && currentFocus !== activeElement) return;
			if (!currentFocus && document.activeElement !== document.body && document.activeElement !== this.element) return;
			if (fallback) {
				Array.from(this.element.shadowRoot?.querySelectorAll<HTMLAnchorElement>('a[data-control-id]') ?? [])
					.find((link) => link.dataset.controlId === fallback.controlId)
					?.focus();
				return;
			}

			const formerEntry = previous[oldIndex];
			if (formerEntry?.control.focusError) {
				await formerEntry.control.focusError();
			}
		});
	}

	private scheduleRefresh() {
		if (this.scheduled) return;
		this.scheduled = true;
		Promise.resolve().then(() => {
			this.scheduled = false;
			void this.refresh();
		});
	}

	private isRelevantMutation(mutation: MutationRecord): boolean {
		if (this.element === mutation.target || this.element.contains(mutation.target as Node)) return false;
		if (this.form && (this.form === mutation.target || this.form.contains(mutation.target as Node))) return true;

		if (mutation.type === 'attributes') {
			const target = mutation.target as HTMLElement;
			return (
				(mutation.attributeName === 'id' && (target.id === this.formId || target === this.form)) ||
				(mutation.attributeName === 'form' &&
					(errorControlTags.includes(target.localName as (typeof errorControlTags)[number]) ||
						target.getAttribute('form') === this.form?.id))
			);
		}

		const containsRelevantNode = (node: Node) => {
			if (!(node instanceof globalThis.Element)) return false;
			if (node === this.element || node.contains(this.element)) return true;
			if (this.isErrorControl(node)) return true;
			return errorControlTags.some((tag) => node.querySelector(tag));
		};
		return [...Array.from(mutation.addedNodes), ...Array.from(mutation.removedNodes)].some(containsRelevantNode);
	}

	private nextFrame(): Promise<void> {
		return new Promise((resolve) => {
			if (typeof requestAnimationFrame === 'function') requestAnimationFrame(() => resolve());
			else setTimeout(resolve, 0);
		});
	}

	private async focusSummary() {
		await this.nextFrame();
		if (!this.active || !this.element.isConnected) return;
		this.element.shadowRoot?.querySelector<HTMLElement>('[data-error-summary]')?.focus();
		this.summaryAnnounced = true;
	}

	private getHeading(): string {
		return this.heading || translations.errorAlert.heading[this.effectiveLanguage];
	}

	private getAnnouncementStatus(): string {
		// null means no update; an empty message means the error was corrected.
		const language = this.effectiveLanguage;
		if (this.announcementMessage === null) return '';
		return this.announcementMessage
			? `${translations.errorAlert.updated[language]} ${this.announcementMessage}`
			: translations.errorAlert.corrected[language];
	}

	private async focusEntry(entry: ErrorAlertEntry, event: MouseEvent) {
		event.preventDefault();
		const focusError = entry.control.focusError;
		if (typeof focusError !== 'function') {
			new ConsoleMessageClass()
				.addDesignSystemTag()
				.addRegularText('Unable to focus the control for error-summary link ')
				.addMonospaceText(entry.anchorId)
				.printMessage();
			return;
		}

		const target = document.getElementById(entry.anchorId);
		if (!target) {
			new ConsoleMessageClass()
				.addDesignSystemTag()
				.addRegularText('The form control target for this error-summary link no longer exists: ')
				.addMonospaceText(entry.anchorId)
				.printMessage();
			return;
		}
		target?.scrollIntoView?.({ block: 'center' });
		await focusError.call(entry.control);
	}

	render() {
		const announcementStatus = this.getAnnouncementStatus();
		if ((!this.active || !this.entries.length) && !announcementStatus) return null;

		return (
			<div>
				{this.active && this.entries.length > 0 && (
					<section
						role={this.summaryAnnounced ? 'region' : 'alert'}
						tabindex="-1"
						// The page-alert heading is in a separate shadow tree and cannot label this wrapper by ID.
						aria-label={this.getHeading()}
						data-error-summary
						lang={this.effectiveLanguage}
					>
						<ontario-page-alert type="error" heading={this.getHeading()}>
							<ul class="ontario-error-alert__list">
								{this.entries.map((entry) => (
									<li key={entry.anchorId}>
										<a
											href={`#${encodeURIComponent(entry.anchorId)}`}
											data-control-id={entry.controlId}
											onClick={(event) => void this.focusEntry(entry, event)}
										>
											{entry.message}
										</a>
									</li>
								))}
							</ul>
						</ontario-page-alert>
					</section>
				)}
				<span class="ontario-show-for-sr" role="status" lang={this.effectiveLanguage}>
					{announcementStatus}
				</span>
			</div>
		);
	}
}
