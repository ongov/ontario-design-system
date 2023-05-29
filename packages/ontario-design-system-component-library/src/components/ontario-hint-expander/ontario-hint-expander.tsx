import { Component, Element, Event, EventEmitter, h, Prop, Watch, State } from '@stencil/core';
import { v4 as uuid } from 'uuid';

import { HintExpander } from './hint-expander.interface';
import { HintContentType } from '../../utils/common/common.interface';

import { validatePropExists } from '../../utils/validation/validation-functions';
import { ConsoleMessageClass } from '../../utils/console-message/console-message';

@Component({
	tag: 'ontario-hint-expander',
	styleUrl: 'ontario-hint-expander.scss',
	shadow: true,
})
export class OntarioHintExpander implements HintExpander {
	@Element() host: HTMLElement;

	/**
	 * The content type of the hint.
	 * If no prop is passed, it will default to a string.
	 * If the hint requires multiple lines or HTML, the `hintContentType` prop should be set to `html`.
	 */
	@Prop({ mutable: true }) hintContentType?: HintContentType = 'string';

	/**
	 * Text to display as the hint expander question/statement
	 */
	@Prop() hint: string;

	/**
	 * Content to display as the hint, once the expander is toggled open.
	 * Please note that any content that is passed into this prop will only be displayed as a string.
	 * If you would like to add HTML content, supply child content to the component.
	 *
	 * @example
	 * <ontario-hint-expander hint="This is the hint"
	 *   <img src="https://www.jquery-az.com/html/images/banana.jpg" title="Title of image" alt="alt text here"/>
	 *   <p> Here is the content beside the image </p>
	 * </ontario-hint-expander>
	 */
	@Prop({ mutable: true }) content: string;

	/**
	 * Used to used to establish a relationship between hint text content and elements using aria-describedby. This is optional - if no ID is passed, one will be generated.
	 */
	@Prop({ mutable: true }) elementId?: string;

	@State() hintState: string;

	/**
	 * Emitted when a keyboard input or mouse event occurs.
	 */
	@Event() toggleExpanderEvent!: EventEmitter<any>;

	/**
	 * Watch for changes to the `hintContentType` prop for validation purposes.
	 * If none is provided, or the wrong type is provided, it will default to `string`.
	 */
	@Watch('hintContentType')
	private checkHintContentType() {
		if (this.hintContentType !== 'string' && this.hintContentType !== 'html') {
			const message = new ConsoleMessageClass();
			message
				.addDesignSystemTag()
				.addMonospaceText(' hintContentType ')
				.addRegularText('for')
				.addMonospaceText(' <ontario-hint-text> ')
				.addRegularText('was not one of the permitted types. A default type of `string` will be applied.')
				.printMessage();

			return (this.hintContentType = 'string');
		}

		return this.hintContentType;
	}

	/*
	 * Watch for changes in the `hint` prop for validation purposes.
	 * If no `hint` prop is provided, the `hint` will be set to the host element textContent (if it exists).
	 */
	@Watch('hint')
	private updateHintContent() {
		this.hintState = this.hint ?? this.host.textContent ?? '';
		this.validateHint(this.hintState);
	}

	/*
	 * Watch for changes to the `content` prop for validation purposes.
	 *
	 * Validate the `content` and make sure the `content` has a value.
	 * Log a warning if user doesn't input a value for the `content` or element content.
	 */
	@Watch('content')
	validateContent(newValue: string) {
		if (validatePropExists(newValue)) {
			const message = new ConsoleMessageClass();
			message
				.addDesignSystemTag()
				.addMonospaceText(' content ')
				.addRegularText('for')
				.addMonospaceText(' <ontario-hint-expander> ')
				.addRegularText('was not provided')
				.printMessage();
		}
	}

	private onClick = (ev: Event) => {
		const hintExpander = ev.target as HTMLButtonElement | null;
		const hintExpanderParent = hintExpander?.parentElement;

		hintExpanderParent?.classList.toggle('ontario-expander--active');
		let content = hintExpanderParent?.querySelector("[data-toggle='ontario-expander-content']");
		content?.classList.toggle('ontario-expander__content--opened');
		content?.classList.contains('ontario-expander__content--opened')
			? content.setAttribute('aria-hidden', 'false')
			: content?.setAttribute('aria-hidden', 'true');
		hintExpanderParent?.classList.contains('ontario-expander--active')
			? hintExpanderParent?.setAttribute('aria-expanded', 'true')
			: hintExpanderParent?.setAttribute('aria-expanded', 'false');

		this.toggleExpanderEvent.emit(ev as MouseEvent);
	};

	/*
	 * Watch for changes in the `hint` prop for validation purposes.
	 *
	 * Validate the `hint` and make sure the `hint` has a value.
	 * Log a warning if user doesn't input a value for the `hint`.
	 */
	validateHint(newValue: string) {
		if (validatePropExists(newValue)) {
			const message = new ConsoleMessageClass();
			message
				.addDesignSystemTag()
				.addMonospaceText(' hint ')
				.addRegularText('for')
				.addMonospaceText(' <ontario-hint-expander> ')
				.addRegularText('was not provided')
				.printMessage();
		}
	}

	/**
	 * Set `hint` using internal component logic
	 */
	componentWillLoad() {
		this.elementId = this.elementId ?? uuid();
		this.updateHintContent();
		this.checkHintContentType();
		this.validateContent(this.content);
	}

	/**
	 * This helper is used to help load translations for any slots + text content passed in by the user.
	 */
	componentDidLoad() {
		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				if (mutation.type === 'attributes') {
					this.updateHintContent();
				}
			});
		});

		const options = { attributes: true };
		observer.observe(this.host, options);
	}

	public getId(): string {
		return this.elementId ?? '';
	}

	render() {
		return (
			<div class="ontario-hint-expander__container">
				<button
					class="ontario-hint-expander__button"
					onClick={this.onClick}
					id={`hint-expander-button-${this.getId()}`}
					aria-controls={`hint-expander-content-${this.getId()}`}
					aria-expanded="false"
					data-toggle="ontario-collapse"
				>
					<span class="ontario-hint-expander__button-icon--close ontario-icon">
						<ontario-icon-chevron-up></ontario-icon-chevron-up>
					</span>
					<span class="ontario-hint-expander__button-icon--open">
						<ontario-icon-chevron-down></ontario-icon-chevron-down>
					</span>
					{this.hint}
				</button>
				<div
					class="ontario-hint-expander__content"
					id={`hint-expander-content-${this.getId()}`}
					aria-labelledby={`hint-expander-button-${this.getId()}`}
					aria-hidden="true"
					data-toggle="ontario-expander-content"
				>
					{this.hintContentType === 'string' ? this.content : <span innerHTML={this.content}></span>}
				</div>
			</div>
		);
	}
}
