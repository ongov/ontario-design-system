import { Component, AttachInternals, Prop, h } from '@stencil/core';
import { isEmpty } from '../../utils/helper/utils';
import { ErrorAlert } from './error-alert.interface';

@Component({
	tag: 'ontario-error-alert',
	styleUrl: 'ontario-error-alert.scss',
	shadow: true,
})
export class OntarioErrorAlert implements ErrorAlert {
	@Prop() message: string = '';
	@Prop() errorId: string = '';
	@Prop() controlId: string = '';
	@Prop() elementId?: string;
	@AttachInternals() internals!: ElementInternals;

	getId = (): string => this.elementId || this.errorId;

	componentWillLoad(): void {
		if (!this.elementId && this.errorId) {
			this.elementId = this.errorId;
		}
	}

	render() {
		const hideError = isEmpty(this.message);

		return (
			<div
				id={this.getId() || undefined}
				role="alert"
				class={`ontario-error-messaging ${hideError ? 'ontario-error__hidden' : ''}`}
				aria-hidden={hideError ? 'true' : undefined}
			>
				<ontario-icon-alert-error></ontario-icon-alert-error>
				<div class="ontario-error-messaging__content">{this.message}</div>
			</div>
		);
	}
}
