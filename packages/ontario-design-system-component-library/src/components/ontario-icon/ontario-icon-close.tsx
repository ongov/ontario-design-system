import { Component, Prop, h } from '@stencil/core';
import close from './assets/ontario-icon-close.svg';

@Component({
	tag: 'ontario-icon-close',
	styleUrl: 'ontario-icon.scss',
	shadow: true,
})
export class OntarioIconClose {
	@Prop() colour: 'black' | 'blue' | 'grey' | 'white' = 'black';

	render() {
		return <div class={`ontario-icon ontario-icon--${this.colour}`} innerHTML={close} />;
	}
}
