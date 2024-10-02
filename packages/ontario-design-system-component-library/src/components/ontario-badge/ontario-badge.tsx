import { Component, Prop, Element, h, Watch, AttachInternals } from '@stencil/core';

import { BadgeColour, BadgeColours, BadgeColourToClass } from './ontario-badge.types';
import { ConsoleMessageClass } from '../../utils/console-message/console-message';
import { validateValueAgainstArray } from '../../utils/validation/validation-functions';

@Component({
	tag: 'ontario-badge',
	styleUrl: 'ontario-badge.scss',
	shadow: true,
})
export class OntarioBadge {
	@Element() host: HTMLElement;
	@AttachInternals() internals: ElementInternals;

	/**
	 * The colour of the badge.
	 */
	@Prop({ mutable: true }) colour: BadgeColour = 'teal';

	/**
	 * The label for the badge.
	 *
	 * Offical guidance is to keep the label length within 15 characters.
	 */
	@Prop() label: string;

	/**
	 * An aria label for screen readers.
	 *
	 * Used to provide more context to screen readers if necessary.
	 *
	 * This property is optional.
	 *
	 * @example
	 * <ontario-badge aria-label-text="This training is currently in progress.">In progress</ontario-badge>
	 */
	@Prop({ mutable: true }) ariaLabelText?: string;

	/**
	 * Watch for changes in the `label` prop for validation purposes.
	 *
	 * If no `label` value or host.textContent is provided, a warning message will be printed.
	 */
	@Watch('label')
	validateLabel() {
		if (!this.getBadgeLabel()) {
			const message = new ConsoleMessageClass();
			message
				.addDesignSystemTag()
				.addMonospaceText(' a label ')
				.addRegularText('for')
				.addMonospaceText(' <ontario-badge> ')
				.addRegularText('was not provided.')
				.printMessage();
		}
	}

	/**
	 * Watch for changes to the `colour` prop.
	 *
	 * If no `colour` is passed, or if the `colour` does not match the `colour` options, a default value of 'teal' will be applied.
	 *
	 * @returns {BadgeColour}
	 */
	@Watch('colour')
	validateColour(): BadgeColour {
		if (this.colour) {
			if (validateValueAgainstArray(this.colour, BadgeColours)) {
				return this.colour;
			} else {
				const message = new ConsoleMessageClass();
				message
					.addDesignSystemTag()
					.addMonospaceText(` colour ${this.colour} `)
					.addRegularText('for')
					.addMonospaceText(' <ontario-badge> ')
					.addRegularText('does not match one of the valid colour types. A default colour of `teal` will be applied.')
					.printMessage();
			}
		}

		return this.setBadgeColour('teal');
	}

	/**
	 * Programatically set and return the colour prop.
	 *
	 * @prop {BadgeColour} colour
	 *
	 * @returns {BadgeColour}
	 */
	setBadgeColour(colour: BadgeColour): BadgeColour {
		this.colour = colour;
		return this.colour;
	}

	/**
	 * Returns badge label depending on if the label prop was set or
	 * if the host.textContent (text in-between the opening and closing tag) was set.
	 *
	 * The label prop takes priority.
	 *
	 * @returns {string | null}
	 */
	getBadgeLabel(): string | null {
		const badgeLabel = this.label ? this.label : this.host.textContent;
		return badgeLabel;
	}

	componentWillLoad() {
		this.validateColour();
		this.validateLabel();
	}

	render() {
		return (
			<span class={`ontario-badge ${BadgeColourToClass[this.colour]}`} aria-label={this.ariaLabelText}>
				{this.getBadgeLabel()}
			</span>
		);
	}
}
