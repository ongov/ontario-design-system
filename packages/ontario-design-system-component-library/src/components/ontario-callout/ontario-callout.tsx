import { Component, Prop, Watch } from '@stencil/core';

import {
	CalloutAside,
	HeadingLevelOptions,
	HeadingContentType,
	HeadingContentTypes,
	HighlightColourOptions,
} from '../../utils/components/callout-aside/callout-aside.interface';
import {
	isValidHighlightColour,
	generateCalloutAside,
	isValidHeadingLevel,
} from '../../utils/components/callout-aside/callout-aside-helpers';
import { validateValueAgainstArray } from '../../utils/validation/validation-functions';
import { ConsoleMessageClass } from '../../utils/console-message/console-message';

@Component({
	tag: 'ontario-callout',
	styleUrl: 'ontario-callout.scss',
	shadow: true,
})
export class OntarioCallout implements CalloutAside {
	/**
	 * The heading level of the callout heading.
	 */
	@Prop({ mutable: true }) headingType: HeadingLevelOptions;

	/**
	 * The type of the heading content. If no prop is passed, it will default to `string`.
	 */
	@Prop({ mutable: true }) headingContentType: HeadingContentType = 'string';

	/**
	 * Text or HTML to be displayed as the heading of the callout. If the heading content should be displayed as HTML, the `headingContentType` needs to be set to `html`.
	 */
	@Prop() headingContent: string;

	/**
	 * Optional text to be displayed as the content for the callout component. If a string is passed, it will automatically be nested in a paragraph tag.
	 *
	 * HTML content can also be passed as the child/children of the callout component if additional/different elements for the content are needed.
	 *
	 * @example
	 * <ontario-callout headingType='h3' headingContent='This is the callout heading'><p>This is the first sentence of the callout content.</p><p>This is the second sentence of the callout content.</p></ontario-callout>
	 */
	@Prop() content?: string;

	/**
	 * Optional prop to choose the border colour of the callout. If none is passed, the default colour will be teal.
	 */
	@Prop({ mutable: true }) highlightColour?: HighlightColourOptions = 'teal';

	/**
	 * Watch for changes to the `headingType` prop.
	 * This is for validation purposes to make sure the `headingType` matches one of the `HeadingLevelOptions`.
	 */
	@Watch('headingType')
	validateHeadingType() {
		if (isValidHeadingLevel(this.headingType)) return this.headingType;

		const message = new ConsoleMessageClass();
		return message
			.addDesignSystemTag()
			.addMonospaceText(` headingType ${this.headingType} `)
			.addRegularText('for')
			.addMonospaceText(' <ontario-callout> ')
			.addRegularText('is not a valid type. Please ensure your heading type matches one of the headingType types.')
			.printMessage();
	}

	/**
	 * Watch for changes in the `headingContentType` variable for validation purposes.
	 *
	 * If the user input doesn't match one of the array values then `headingContentType` will be set to its default (`string`).
	 * If a match is found in one of the array values then `headingContentType` will be set to the matching array key value.
	 */
	@Watch('headingContentType')
	validateHeadingContentType() {
		const isValid = validateValueAgainstArray(this.headingContentType, HeadingContentTypes);
		if (isValid) {
			return this.headingContentType;
		} else {
			return this.warnDefaultType();
		}
	}

	/**
	 * Watch for changes in the `headingContent` prop for validation purposes.
	 *
	 * If no `headingContent` value is provided, a warning message will be printed.
	 */
	@Watch('headingContent')
	validateHeadingContent() {
		if (!this.headingContent) {
			const message = new ConsoleMessageClass();
			message
				.addDesignSystemTag()
				.addMonospaceText(' headingContent ')
				.addRegularText('for')
				.addMonospaceText(' <ontario-callout> ')
				.addRegularText('was not provided.')
				.printMessage();
		}
	}

	/**
	 * Watch for changes to the `highlightColour` prop.
	 *
	 * If no `highlightColour` is passed, or if the `highlightColour` does not match the `highlightColour` options, a default value of 'teal' will be applied.
	 */
	@Watch('highlightColour')
	validateHighlightColour() {
		if (this.highlightColour) {
			if (isValidHighlightColour(this.highlightColour)) return this.highlightColour;
			else {
				const message = new ConsoleMessageClass();
				message
					.addDesignSystemTag()
					.addMonospaceText(` highlightColour ${this.highlightColour} `)
					.addRegularText('for')
					.addMonospaceText(' <ontario-callout> ')
					.addRegularText(
						'does not match one of the valid highlightColour types. A default colour of `teal` will be applied.',
					)
					.printMessage();
			}
		}

		// if no highlight colour is passed, return 'teal'
		return 'teal';
	}

	/**
	 * Print the invalid `type` warning message.
	 * @returns default type ('string')
	 */
	private warnDefaultType() {
		const message = new ConsoleMessageClass();
		message
			.addDesignSystemTag()
			.addMonospaceText(' headingContentType ')
			.addRegularText('on')
			.addMonospaceText(' <ontario-callout> ')
			.addRegularText('was set to an invalid type; only')
			.addMonospaceText(' string or html ')
			.addRegularText('are supported. The default type')
			.addMonospaceText(' string ')
			.addRegularText('is assumed.')
			.printMessage();
		return (this.headingContentType = 'string');
	}

	componentWillLoad() {
		this.validateHighlightColour();
		this.validateHeadingContent();
		this.validateHeadingType();
		this.validateHeadingContentType();
	}

	render() {
		return generateCalloutAside(
			'callout',
			this.headingType,
			this.headingContentType,
			this.headingContent,
			this.content,
			this.highlightColour,
		);
	}
}
