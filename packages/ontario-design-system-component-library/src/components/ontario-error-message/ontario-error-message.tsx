import { Component, Element, h, Host, Prop, Watch } from '@stencil/core';
import { isEmpty } from '../../utils/helper/utils';
import { ConsoleMessageClass } from '../../utils/console-message/console-message';

/**
 * Displays a plain-text error message for a form control.
 *
 * Add this component's host ID to the associated native field's
 * `aria-describedby` value and set `aria-invalid` while the field is invalid.
 */
@Component({
	tag: 'ontario-error-message',
	styleUrl: 'ontario-error-message.scss',
	shadow: true,
})
export class OntarioErrorMessage {
	@Element() element: HTMLElement;

	/**
	 * The plain-text error message. An empty message is not rendered.
	 */
	@Prop() message?: string;

	/**
	 * An alias for the host ID used by the associated field's `aria-describedby`. Prefer the native `id` attribute.
	 */
	@Prop() elementId?: string;

	/**
	 * Whether the error should be announced when it is rendered.
	 */
	@Prop() announce = true;

	componentWillLoad() {
		this.validateMessage();
	}

	@Watch('message')
	validateMessage() {
		// Warn on message changes, not every render. The owning control retains its invalid state.
		if (this.message && isEmpty(this.message)) {
			new ConsoleMessageClass()
				.addDesignSystemTag()
				.addMonospaceText(' <ontario-error-message> ')
				.addRegularText(
					'message contains only whitespace. Supply meaningful error text or an empty string to clear it.',
				)
				.printMessage();
		}
	}

	render() {
		const hasMessage = !isEmpty(this.message);
		return (
			<Host id={this.elementId || this.element.id || undefined} hidden={!hasMessage}>
				{hasMessage && (
					<div role={this.announce ? 'alert' : undefined} class="ontario-error-messaging">
						<ontario-icon-alert-error aria-hidden="true"></ontario-icon-alert-error>
						<div class="ontario-error-messaging__content">{this.message}</div>
					</div>
				)}
			</Host>
		);
	}
}
