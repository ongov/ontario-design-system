import { Component, Prop, Element, h, Watch, State } from '@stencil/core';

@Component({
	tag: 'ontario-step-indicator',
	styleUrl: 'ontario-step-indicator.scss',
	shadow: true,
})
export class OntarioStepIndicator {
	@Element() host: HTMLElement;

	/**
	 * Shows back button depending on which step the user is on.
	 */
	@Prop() showBackbutton: boolean = false;

	/**
	 * The link for where the back button should lead.
	 */
	@Prop() backButtonlink: string;

	/**
	 * Lets user know which step the current page is on.
	 */
	@Prop() currentStep?: number = 1;

	/**
	 * Number of steps that the form has.
	 */
	@Prop() numberOfStep?: number = 5;

	/**
	 * Display the text in percentage format.
	 */
	@Prop() isPercentage?: boolean = false;

	/**
	 * Percentage of the form that has been completed.
	 */
	@Prop() percentageComplete?: number = 0;

	/**
	 * @returns the classes of the button based of the button's `type`.
	 */
	private getClass() {
		return `ontario-step-indicator--with-back-button--${this.showBackbutton}`;
	}

	componentWillLoad() {}
	render() {
		return (
			<div class="ontario-step-indicator">
				<div class="ontario-row">
					<div class="ontario-columns ontario-small-12">
						<div class={this.getClass()}>
							<button class="ontario-button ontario-button--tertiary">
								<svg
									class="ontario-icon"
									aria-hidden="true"
									focusable="false"
									viewBox="0 0 24 24"
									preserveAspectRatio="xMidYMid meet"
								>
									<use href="#ontario-icon-chevron-left"></use>
								</svg>
								Back
							</button>
							<span class="ontario-h4">Step&nbsp;2 of&nbsp;5</span>
						</div>
						<hr />
					</div>
				</div>
			</div>
		);
	}
}
