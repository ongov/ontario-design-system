import { Component, h, Element, Prop, State, Watch } from '@stencil/core';

import { Blockquote } from './blockquote.interface';

import { validatePropExists } from '../../utils/validation/validation-functions';
import { ConsoleMessageClass } from '../../utils/console-message/console-message';

@Component({
	tag: 'ontario-blockquote',
	styleUrl: 'ontario-blockquote.scss',
	shadow: true,
})
export class OntarioBlockquote implements Blockquote {
	@Element() host: HTMLElement;

	/**
	 * Text to be displayed as the quote.
	 *
	 * Note that wrapping the quotes in quotations is not needed - this is handled through the component styles
	 */
	@Prop({ mutable: true }) quote: string;

	/**
	 * Optional text to be displayed as the attribution (the author) of the quote.
	 */
	@Prop() attribution?: string;

	/**
	 * Optional text to be displayed for additional information about the attribution/author.
	 */
	@Prop() byline?: string;

	@State() shortQuoteLength: number = 140;

	@State() shortQuote: boolean = false;

	@State() private quoteState: string;

	/*
	 * Watch for changes in the `quote` prop for validation purposes.
	 *
	 * If the `quote` prop is not provided, set the `quote` prop to the host textContent (if it exists).
	 * If the `quote` prop length is 140 characters or less, set the `shortQuote` state to true - this will add additonal classes for the blockquote styles.
	 */
	@Watch('quote')
	validateQuote() {
		this.quoteState = this.quote ?? this.host.textContent ?? '';
		this.validateQuoteContent(this.quoteState);
		this.shortQuote = this.quoteState?.length <= this.shortQuoteLength ?? true;
	}

	/**
	 * Print the missing `quote` prop warning message
	 */
	validateQuoteContent(newValue: string) {
		if (validatePropExists(newValue)) {
			const message = new ConsoleMessageClass();
			message
				.addDesignSystemTag()
				.addMonospaceText(' quote ')
				.addRegularText('for')
				.addMonospaceText(' <ontario-blockquote> ')
				.addRegularText('was not provided')
				.printMessage();
		}
	}

	componentWillLoad() {
		this.validateQuote();
	}

	/**
	 * This helper is used to help load translations for any slots + text content passed in by the user.
	 */
	componentDidLoad() {
		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				if (mutation.type === 'attributes') {
					this.validateQuote();
				}
			});
		});

		const options = { attributes: true };
		observer.observe(this.host, options);
	}

	render() {
		return (
			<blockquote class={this.shortQuote ? `ontario-blockquote ontario-blockquote--short` : `ontario-blockquote`}>
				<p>{this.quoteState}</p>
				{this.attribution && <cite class="ontario-blockquote__attribution">{this.attribution}</cite>}
				{this.byline && <cite class="ontario-blockquote__byline">{this.byline}</cite>}
			</blockquote>
		);
	}
}
