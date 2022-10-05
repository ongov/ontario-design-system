import { Component, h, Element, Prop, State, Watch } from '@stencil/core';

@Component({
	tag: 'ontario-blockquote',
	styleUrl: 'ontario-blockquote.scss',
	shadow: true,
})
export class OntarioBlockquote {
	@Element() host: HTMLElement;

	/**
	 * Text to be displayed as the quote. Note that wrapping the quotes in quotations is not needed - this is handled through the component styles.
	 */
	@Prop({ mutable: true }) quote: string;

	/**
	 * Text to be displayed as the attribution (the author) of the quote.
	 */
	@Prop() attribution: string;

	/**
	 * Optional text for additional information about the attribution/author.
	 */
	@Prop() byline?: string;

	@State() shortQuote: boolean = false;

	@Watch('quote')
	validateQuoteLength() {
		this.quote = this.quote ?? this.host.textContent ?? '';
		this.quote.length <= 140 ? (this.shortQuote = true) : (this.shortQuote = false);
	}

	componentWillLoad() {
		this.validateQuoteLength();
	}

	render() {
		return (
			<blockquote class={this.shortQuote ? `ontario-blockquote ontario-blockquote--short` : `ontario-blockquote`}>
				<p>{this.quote}</p>
				<cite class="ontario-blockquote__attribution">{this.attribution}</cite>
				{this.byline && <cite class="ontario-blockquote__byline">{this.byline}</cite>}
			</blockquote>
		);
	}
}
