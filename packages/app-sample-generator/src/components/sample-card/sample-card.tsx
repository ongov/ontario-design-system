import { Component, h, Prop } from '@stencil/core';

@Component({
	tag: 'sample-card',
	styleUrl: 'sample-card.css',
	shadow: true,
})
export class SampleCard {
	/** Headline for the card surface. */
	@Prop() heading: string = 'Heading';

	/** Supporting summary text displayed beneath the heading. */
	@Prop() summary: string = 'Summary text goes here.';

	/** Status badge label rendered in the header. */
	@Prop() status: string = 'Draft';

	render() {
		return (
			<article class="card">
				<header class="header">
					<div class="title">
						<p class="heading">{this.heading}</p>
						<p class="summary">{this.summary}</p>
					</div>
					<span class="status">{this.status}</span>
				</header>
				<div class="body">
					<slot></slot>
				</div>
				<div class="actions">
					<slot name="actions"></slot>
				</div>
			</article>
		);
	}
}
