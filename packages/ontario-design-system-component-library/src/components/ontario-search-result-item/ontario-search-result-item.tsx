import { Component, Element, Event, EventEmitter, h, Host, Prop, State } from '@stencil/core';

import { Language } from '../../utils/common/language-types';

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
	 * Optional ordered text segments used to style match and completion portions.
	 */
	@Prop() segments?: Array<{ text: string; kind: 'match' | 'completion' }>;

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

	componentDidLoad() {
		const slotElement = this.element.shadowRoot?.querySelector('slot');
		if (slotElement) {
			this.syncSlotState(slotElement as HTMLSlotElement);
		}
	}

	/**
	 * Synchronise whether fallback text should render based on assigned slot nodes.
	 */
	private syncSlotState(slotElement: HTMLSlotElement) {
		this.hasDefaultSlot = !!slotElement.assignedNodes({ flatten: true }).length;
	}

	/**
	 * Handle default slot assignment changes.
	 */
	private onSlotChange = (event: Event) => {
		this.syncSlotState(event.target as HTMLSlotElement);
	};

	/**
	 * Emit a selection event when interaction is allowed.
	 */
	private emitSelection() {
		if (this.disabled) return;

		this.itemSelected.emit({
			label: this.label,
			value: this.value || this.label,
			href: this.href,
		});
	}

	/**
	 * Handle clicks on the host row (non-link areas).
	 */
	private onSelect = (event: MouseEvent) => {
		const target = event.target as HTMLElement | null;
		if (target?.closest('a')) {
			return;
		}

		this.emitSelection();
	};

	/**
	 * Handle clicks on the optional link without double-emitting from host click bubbling.
	 */
	private onLinkSelect = (event: MouseEvent) => {
		event.stopPropagation();

		if (this.disabled) {
			event.preventDefault();
			return;
		}

		this.emitSelection();
	};

	/**
	 * Build host classes from interactive state.
	 */
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

	/**
	 * Resolve renderable text segments from props with a safe fallback.
	 */
	private getResolvedSegments(label: string): Array<{ text: string; kind: 'match' | 'completion' }> {
		if (this.segments?.length) {
			return this.segments
				.filter((segment) => !!segment.text)
				.map((segment) => ({
					text: segment.text,
					kind: segment.kind,
				}));
		}

		return [{ text: label, kind: 'completion' }];
	}

	private renderHighlightedLabel(label: string) {
		const parts = this.getResolvedSegments(label);

		return (
			<span class="ontario-search-result-item__label">
				{parts.map((part, index) => (
					<span
						class={
							part.kind === 'completion'
								? 'ontario-search-result-item__completion'
								: 'ontario-search-result-item__match'
						}
						key={`part-${index}`}
					>
						{part.text}
					</span>
				))}
			</span>
		);
	}

	render() {
		const value = this.value || this.label;
		const labelText = this.label || '';
		const isSelected = !!(this.active || this.selected);
		const isDisabled = !!this.disabled;

		return (
			<Host
				role="option"
				tabIndex={-1}
				aria-selected={String(isSelected)}
				aria-disabled={String(isDisabled)}
				class={this.getHostClassNames()}
				onClick={this.onSelect}
				data-value={value}
			>
				<div class="ontario-search-result-item__content">
					<slot onSlotchange={this.onSlotChange}></slot>
					{!this.hasDefaultSlot && (
						<div class="ontario-search-result-item__text">
							{this.href ? (
								<a href={this.href} class="ontario-search-result-item__link" tabIndex={-1} onClick={this.onLinkSelect}>
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
