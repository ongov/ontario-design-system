import { Component, Element, Event, EventEmitter, h, Host, Prop, State, Watch } from '@stencil/core';

import { Language } from '../../utils/common/language-types';
import { Segment } from '../../utils/components/search-box-autocomplete';

/**
 * Ontario Search Result Item renders a semantic option row for search suggestions.
 *
 * For component guidance, see:
 * - https://designsystem.ontario.ca/components/detail/autocomplete.html
 */
@Component({
	tag: 'ontario-search-result-item',
	styleUrl: 'ontario-search-result-item.scss',
	shadow: true,
})
export class OntarioSearchResultItem {
	@Element() element!: HTMLElement;

	/**
	 * Primary text for the suggestion row.
	 */
	@Prop() label?: string;

	/**
	 * Optional secondary text shown below the label.
	 */
	@Prop() description?: string;

	/**
	 * Optional value used by parent components during selection.
	 * Falls back to `label` when not set.
	 */
	@Prop() value?: string;

	/**
	 * Optional URL to represent a navigable search result.
	 */
	@Prop() href?: string;

	/**
	 * Ordered label segments used to render matched input text and completion text.
	 */
	@Prop() segments?: Segment[];

	/**
	 * Optional highlight parts used to style input-matched text and completion text.
	 * Deprecated in favour of `segments`.
	 */
	@Prop() highlightParts?: Array<{ text: string; isInputMatch: boolean }>;

	/**
	 * Optional bold ranges over the label string for completion emphasis.
	 * Deprecated in favour of `segments`.
	 */
	@Prop() boldRanges?: Array<{ start: number; end: number }>;

	/**
	 * Marks the option as disabled and non-interactive.
	 */
	@Prop() disabled?: boolean = false;

	/**
	 * Marks the option as selected (parent-managed).
	 */
	@Prop() selected?: boolean = false;

	/**
	 * Marks the option as active during keyboard navigation (parent-managed).
	 */
	@Prop() active?: boolean = false;

	/**
	 * Optional language prop to align with component API conventions.
	 */
	@Prop() language?: Language = 'en';

	/**
	 * Emitted when a non-disabled option is selected via click.
	 */
	@Event() itemSelected!: EventEmitter<{ label?: string; value?: string; href?: string }>;

	@State() private hasDefaultSlot = false;

	@Watch('active')
	@Watch('selected')
	private updateAriaSelectedState() {
		this.element.setAttribute('aria-selected', String(!!(this.active || this.selected)));
	}

	@Watch('disabled')
	private updateAriaDisabledState() {
		this.element.setAttribute('aria-disabled', String(!!this.disabled));
	}

	componentWillLoad() {
		this.element.setAttribute('role', 'option');
		this.element.tabIndex = -1;
		this.updateAriaSelectedState();
		this.updateAriaDisabledState();
	}

	componentDidLoad() {
		const slotElement = this.element.shadowRoot?.querySelector('slot');
		if (slotElement) {
			this.syncSlotState(slotElement as HTMLSlotElement);
		}
	}

	private syncSlotState(slotElement: HTMLSlotElement) {
		this.hasDefaultSlot = !!slotElement.assignedNodes({ flatten: true }).length;
	}

	private onSlotChange = (event: Event) => {
		this.syncSlotState(event.target as HTMLSlotElement);
	};

	private onSelect = () => {
		if (this.disabled) return;

		this.itemSelected.emit({
			label: this.label,
			value: this.value || this.label,
			href: this.href,
		});
	};

	private getHostClassNames() {
		return [
			'ontario-search-result-item',
			this.active && 'ontario-search-result-item--active',
			this.selected && 'ontario-search-result-item--selected',
			this.disabled && 'ontario-search-result-item--disabled',
		]
			.filter(Boolean)
			.join(' ');
	}

	private getResolvedSegments(label: string): Segment[] {
		if (this.segments?.length) {
			return this.segments;
		}

		if (this.highlightParts?.length) {
			return this.highlightParts.map((part) => ({
				text: part.text,
				kind: part.isInputMatch ? 'match' : 'completion',
			}));
		}

		if (this.boldRanges?.length) {
			const ranges = this.boldRanges
				.map((range) => ({
					start: Math.max(0, Math.min(range.start, label.length)),
					end: Math.max(0, Math.min(range.end, label.length)),
				}))
				.filter((range) => range.end > range.start)
				.sort((a, b) => a.start - b.start);

			if (!ranges.length) {
				return [{ text: label, kind: 'match' }];
			}

			const mergedRanges: Array<{ start: number; end: number }> = [];
			for (const range of ranges) {
				const lastRange = mergedRanges[mergedRanges.length - 1];
				if (!lastRange || range.start > lastRange.end) {
					mergedRanges.push({ ...range });
				} else {
					lastRange.end = Math.max(lastRange.end, range.end);
				}
			}

			const segments: Segment[] = [];
			let cursor = 0;
			for (const range of mergedRanges) {
				if (cursor < range.start) {
					segments.push({ text: label.slice(cursor, range.start), kind: 'match' });
				}
				segments.push({ text: label.slice(range.start, range.end), kind: 'completion' });
				cursor = range.end;
			}
			if (cursor < label.length) {
				segments.push({ text: label.slice(cursor), kind: 'match' });
			}

			return segments;
		}

		return [{ text: label, kind: 'completion' }];
	}

	private renderHighlightedLabel(label: string) {
		const segments = this.getResolvedSegments(label);

		return (
			<span class="ontario-search-result-item__label">
				{segments.map((segment, index) => (
					<span
						class={
							segment.kind === 'completion'
								? 'ontario-search-result-item__completion'
								: 'ontario-search-result-item__match'
						}
						key={`part-${index}`}
					>
						{segment.text}
					</span>
				))}
			</span>
		);
	}

	render() {
		const value = this.value || this.label;
		const labelText = this.label || '';

		return (
			<Host class={this.getHostClassNames()} onClick={this.onSelect} data-value={value}>
				<div class="ontario-search-result-item__content">
					<slot onSlotchange={this.onSlotChange}></slot>
					{!this.hasDefaultSlot && (
						<div class="ontario-search-result-item__text">
							{this.href ? (
								<a href={this.href} class="ontario-search-result-item__link" tabIndex={-1}>
									{this.renderHighlightedLabel(labelText)}
								</a>
							) : (
								this.renderHighlightedLabel(labelText)
							)}
							{this.description && <span class="ontario-search-result-item__description">{this.description}</span>}
						</div>
					)}
				</div>
			</Host>
		);
	}
}
