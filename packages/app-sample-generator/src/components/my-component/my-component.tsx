import { Component, h, Prop } from '@stencil/core';

@Component({
	tag: 'my-component',
	styleUrl: 'my-component.css',
	shadow: true,
})
export class MyComponent {
	/** Friendly label to demonstrate prop passing in generated samples. */
	@Prop() prop: string = 'value';

	render() {
		return (
			<div class="my-component">
				<p class="heading">My component</p>
				<p class="body">Prop value: {this.prop}</p>
			</div>
		);
	}
}
