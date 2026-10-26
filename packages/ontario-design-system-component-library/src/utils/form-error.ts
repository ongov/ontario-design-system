import { v4 as uuid } from 'uuid';
import { ConsoleMessageClass } from './console-message/console-message';

/**
 * The effective error and identities used for summary updates and host navigation.
 * The native field's controlId may differ from the custom element's anchorId.
 */
export interface FormControlError {
	controlId: string;
	message: string;
	anchorId: string;
}

/**
 * Shared error-summary contract; validation and native focus targets remain control-owned.
 */
export interface FormErrorControl {
	getErrorState(): Promise<FormControlError | null>;
	focusError(): Promise<void>;
}

/** Allows discovery before hydration has attached the control's public methods. */
export interface ErrorAwareControl extends HTMLElement, Partial<FormErrorControl> {}

/**
 * Creates a snapshot without changing validation state. Whitespace-only messages
 * intentionally remain errors, even though the inline renderer hides blank content.
 */
export function getFormControlError(
	element: HTMLElement,
	message: string | undefined,
	controlId?: string,
): FormControlError | null {
	if (!message) return null;
	const anchorId = ensureErrorControlAnchor(element);
	return { controlId: controlId ?? anchorId, message, anchorId };
}

/**
 * Preserves hint descriptions alongside errors. Apply errorMessageId to the error
 * component's host in the same tree as the native field, not inside its shadow root.
 */
export function getFormErrorPresentation(
	element: HTMLElement,
	message: string | undefined,
	hintId?: string | null,
	controlId?: string,
) {
	const error = !!message;
	const errorMessageId = error ? `error-${controlId ?? ensureErrorControlAnchor(element)}` : undefined;
	const describedBy = [hintId, errorMessageId].filter(Boolean).join(' ') || undefined;
	return { error, errorMessageId, describedBy };
}

export const errorControlTags = [
	'ontario-input',
	'ontario-textarea',
	'ontario-dropdown-list',
	'ontario-checkboxes',
	'ontario-radio-buttons',
	'ontario-date-input',
] as const;

export const inlineErrorAnnouncementSuppressedEvent = 'inlineErrorAnnouncementSuppressed';

const warnedErrorControlAnchors = new WeakSet<HTMLElement>();

/**
 * Preserves application-provided host IDs, warning about unsafe values rather than
 * rewriting them. A generated ID provides a navigation target when none is supplied.
 */
export function ensureErrorControlAnchor(element: HTMLElement): string {
	if (element.id) {
		const hasWhitespace = /[\t\n\f\r ]/.test(element.id);
		const hasDuplicateId =
			typeof document !== 'undefined' &&
			Array.from(document.querySelectorAll<HTMLElement>('[id]')).some(
				(candidate) => candidate !== element && candidate.id === element.id,
			);

		if ((hasWhitespace || hasDuplicateId) && !warnedErrorControlAnchors.has(element)) {
			warnedErrorControlAnchors.add(element);
			new ConsoleMessageClass()
				.addDesignSystemTag()
				.addRegularText('Error-summary navigation may be unreliable because this control has an ')
				.addRegularText(hasDuplicateId ? 'ID that is not unique: ' : 'ID containing whitespace: ')
				.addMonospaceText(element.id)
				.printMessage();
		}

		return element.id;
	}

	let anchorId = `ontario-error-control-${uuid()}`;
	while (typeof document !== 'undefined' && document.getElementById(anchorId)) {
		anchorId = `ontario-error-control-${uuid()}`;
	}

	element.id = anchorId;
	return anchorId;
}

const activeErrorSummaries = new WeakMap<ErrorAwareControl, Set<object>>();

/**
 * Tracks suppression by summary owner so hiding or removing one summary cannot
 * restore inline announcements while another summary still owns the control.
 */
export function setErrorAlertActive(control: ErrorAwareControl, active: boolean, owner: object): void {
	const owners = activeErrorSummaries.get(control) ?? new Set<object>();
	const wasActive = owners.size > 0;
	if (active) owners.add(owner);
	else owners.delete(owner);
	const isActive = owners.size > 0;
	if (isActive) activeErrorSummaries.set(control, owners);
	else activeErrorSummaries.delete(control);
	if (wasActive === isActive) return;

	if (isActive) control.setAttribute('data-error-summary-active', '');
	else control.removeAttribute('data-error-summary-active');
	control.dispatchEvent(new CustomEvent(inlineErrorAnnouncementSuppressedEvent, { detail: isActive }));
}
