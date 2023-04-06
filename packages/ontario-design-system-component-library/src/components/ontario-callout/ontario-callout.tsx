import { Component, Prop, Watch } from '@stencil/core';
import {
	CalloutAside,
	HeadingLevelOptions,
	HighlightColourOptions,
} from '../../utils/callout-aside/callout-aside.interface';
import {
	isValidHighlightColour,
	generateCalloutAside,
	isValidHeadingLevel,
} from '../../utils/callout-aside/callout-aside-helpers';
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
	 * Text or HTML to be displayed as the heading of the callout.
	 */
	@Prop() headingContent: string | HTMLElement;

	/**
	 * Optional text to be displayed as the content for the callout component. If a string is passed, it will automatically be nested in a paragraph tag.
	 *
	 * HTML content can also be passed as either the child/children of the callout component if additional/different elements for the content are needed, or through the `content` prop.
	 *
	 * @example
	 * <ontario-callout headingType='h3' headingContent='This is the callout heading'><p>This is the first sentence of the callout content.</p><p>This is the second sentence of the callout content.</p></ontario-callout>
	 */
	@Prop() content?: string | HTMLElement;

	/**
	 * Optional prop to choose the border colour of the callout. If none is passed, the default colour will be teal.
	 */
	@Prop({ mutable: true }) highlightColour?: HighlightColourOptions = 'teal';

	/**
	 * Watch for changes to the headingType prop.
	 * This is for validation purposes to make sure the headingType matches one of the HeadingLevelOptions.
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
	 * Watch for changes to the highlightColour prop.
	 *
	 * If no highlightColour is passed, or if the highlightColour does not match the highlightColour options, a default value of 'teal' will be applied.
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

	componentWillLoad() {
		this.validateHighlightColour();
		this.validateHeadingContent();
		this.validateHeadingType();
	}

	render() {
		return generateCalloutAside('callout', this.headingType, this.headingContent, this.content, this.highlightColour);
	}
}
