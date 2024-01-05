import { Component, Prop, Element, h, Watch, State } from '@stencil/core';
import { CardsPerRow } from './ontario-collection-card-types';
import { ConsoleMessageClass } from '../../utils/console-message/console-message';

@Component({
	tag: 'ontario-card-collection',
	styleUrl: 'ontario-card-collection.scss',
	shadow: true,
})
export class OntarioCardCollection {
	@Element() host: HTMLElement;

	/**
	 * The number of cards to display per row.
	 *
	 * If no number is passed, it will default to 3.
	 */
	@Prop() cardsPerRow: CardsPerRow = 3;

	/**
	 * Mutable variable, for internal use only.
	 *
	 * Set number of cards per row depending on validation result.
	 */
	@State() private cardsPerRowState: number;

	/**
	 * Watch for changes to the `cardsPerRow` property for validation purposes.
	 *
	 * If the user input is not a number or is a negative number then `cardsPerRow` will be set to its default (3).
	 */
	@Watch('cardsPerRow')
	validateCardsPerRow() {
		if (isNaN(this.cardsPerRow) || (!isNaN(this.cardsPerRow) && this.cardsPerRow <= 0)) {
			const message = new ConsoleMessageClass();
			message
				.addDesignSystemTag()
				.addMonospaceText(' cards-per-row ')
				.addRegularText('on')
				.addMonospaceText(' <ontario-card> ')
				.addRegularText(
					`${
						isNaN(this.cardsPerRow) ? 'was set to a non-numeric value' : 'was set to a negative number'
					}; only a positive number is allowed. The default number of cards per row: `,
				)
				.addMonospaceText(' 3 ')
				.addRegularText('was assumed.')
				.printMessage();
			this.cardsPerRowState = 3;
		} else {
			this.cardsPerRowState = this.cardsPerRow;
		}
	}

	/**
	 * @returns the classes of the ontario cards based off the `cardType` and number of cards per row.
	 */
	private getClass(): string {
		return `
      ontario-card-collection__container
      ontario-card-collecton--cards-per-row-${this.cardsPerRowState}
    `.trim();
	}

	componentWillLoad() {
		this.validateCardsPerRow();
	}

	render() {
		return (
			<ul class={this.getClass()}>
				<slot></slot>
			</ul>
		);
	}
}
