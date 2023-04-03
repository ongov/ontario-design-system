import { Component, Prop, Watch } from '@stencil/core';
import {
	CalloutAside,
	HeadingLevelOptions,
	HighlightColourOptions,
} from '../../utils/callout-aside/callout-aside.interface';
import {
	isValidHighlightColour,
	generateComponent,
	isValidHeadingLevel,
} from '../../utils/callout-aside/callout-aside-helpers';
import { ConsoleMessageClass } from '../../utils/console-message/console-message';

@Component({
	tag: 'ontario-aside',
	styleUrl: 'ontario-aside.scss',
	shadow: true,
})
export class OntarioAside implements CalloutAside {
	/**
	 * The heading level of the aside heading.
	 */
	@Prop({ mutable: true }) headingType: HeadingLevelOptions;

	/**
	 * Text or HTML to be displayed as the heading of the aside.
	 */
	@Prop() headingContent: string;

	/**
	 * Optional text to be displayed as the content for the aside component. If a string is passed, it will automatically be nested in a paragraph tag.
	 *
	 * HTML content can also be passed as the child/children of the aside component if additional/different elements for the content are needed.
	 *
	 * @example
	 * <ontario-aside headingType='h3' headingContent='This is the aside heading'><p>This is the first sentence of the aside content.</p><p>This is the second sentence of the aside content.</p></ontario-aside>
	 */
	@Prop() content?: string;

	/**
	 * Optional prop to choose the border colour of the aside. If none is passed, the default colour will be teal.
	 */
	@Prop({ mutable: true }) highlightColour?: HighlightColourOptions = 'teal';

	/**
	 * Watch for changes to the headingType prop.
	 * This is for validation purposes to make sure the headingType matches one of the HeadingLevelOptions.
	 */
	@Watch('headingType')
	validateHeadingType() {
		const validHeadingLevel = isValidHeadingLevel(this.headingType);

		if (validHeadingLevel) return this.headingType;

		const message = new ConsoleMessageClass();
		return message
			.addDesignSystemTag()
			.addMonospaceText(' headingType ')
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
				.addMonospaceText(' <ontario-aside> ')
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
			const validHighlightColour = isValidHighlightColour(this.highlightColour);
			if (validHighlightColour) return this.highlightColour;
			else {
				const message = new ConsoleMessageClass();
				message
					.addDesignSystemTag()
					.addMonospaceText(' highlightColour ')
					.addRegularText('for')
					.addMonospaceText(' <ontario-aside> ')
					.addRegularText(
						'does not match one of the valid highlightColour types. A default colour of `teal` will be applied.',
					)
					.printMessage();
			}

			return (this.highlightColour = 'teal');
		}

		// if no highlight colour is passed, return 'teal'
		return (this.highlightColour = 'teal');
	}

	componentWillLoad() {
		this.validateHighlightColour();
		this.validateHeadingContent();
		this.validateHeadingType();
	}

	render() {
		return generateComponent(
			'aside',
			this.headingType,
			this.headingContent,
			this.content ?? this.content,
			this.highlightColour ?? this.highlightColour,
		);
	}
}
