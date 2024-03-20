import { Component, Prop, h, State, Watch, Listen, getAssetPath } from '@stencil/core';

import {
	FooterLinks,
	OntarioFooterType,
	ThreeColumnOptions,
	TwoColumnOptions,
	SimpleFooterLinks,
} from './ontario-footer-interface';
import { ExpandedFooterWrapper, FooterColumn, FooterSocialLinksProps, SimpleFooter } from './components';
import { isInvalidTwoColumnOptions, isInvalidThreeColumnOptions } from './utils';
import { Language } from '../../utils/common/language-types';
import { validateLanguage } from '../../utils/validation/validation-functions';
import { ConsoleMessageClass } from '../../utils/console-message/console-message';
import { ConsoleType } from '../../utils/console-message/console-message.enum';

import translations from '../../translations/global.i18n.json';

@Component({
	tag: 'ontario-footer',
	styleUrl: 'ontario-footer.scss',
	shadow: true,
	assetsDirs: ['assets'],
})
export class OntarioFooter {
	/**
	 * The language of the component.
	 * This is used for translations, and is by default set through event listeners checking for a language property from the header. If no language is passed, it will default to English.
	 */
	@Prop({ mutable: true }) language: Language;

	/**
	 * The type of footer to be rendered. If no prop is provided, it will default to the 'default' type.
	 */
	@Prop() type: OntarioFooterType = 'default';

	/**
	 * A prop that stores the required links for all footers.
	 * Available options are 'accessibilityLink', 'privacyLink', 'contactLink' and 'printerLink'
	 */
	@Prop() footerLinks: FooterLinks | string;

	/**
	 * Social media links to render in the footer.
	 * Available options are 'facebook', 'twitter', 'instagram' and 'youtube'
	 */
	@Prop() socialLinks: FooterSocialLinksProps | string;

	/**
	 * Stores the titles and content for the expanded two column footer.
	 */
	@Prop() twoColumnOptions?: TwoColumnOptions | string;

	/**
	 * Stores the titles and content for the expanded three column footer.
	 */
	@Prop() threeColumnOptions?: ThreeColumnOptions | string;

	/**
	 * Top margin for the footer. By default, this prop is set to `true`, which adds a margin top value of `5rem`.
	 * If set to `false`, the top margin value will be set to zero.
	 */
	@Prop() topMargin: boolean = true;

	/**
	 * The base path to an assets folder containing the Design System assets
	 */
	@Prop() assetBasePath: string;

	@State() translations: any = translations;

	@State() private footerLinksState: FooterLinks;

	@State() private socialLinksState: FooterSocialLinksProps;

	@State() private twoColumnState: TwoColumnOptions;

	@State() private threeColumnState: ThreeColumnOptions;

	/**
	 * This listens for the `setAppLanguage` event sent from the test language toggler when it is
	 * connected to the DOM. It is used for the initial language when the input component loads.
	 */
	@Listen('setAppLanguage', { target: 'window' })
	handleSetAppLanguage(event: CustomEvent<Language>) {
		if (!this.language) {
			this.language = validateLanguage(event);
		}
	}

	@Listen('headerLanguageToggled', { target: 'window' })
	handleHeaderLanguageToggled(event: CustomEvent<Language>) {
		this.language = validateLanguage(event);
	}

	@Watch('footerLinks')
	private processFooterLinks() {
		this.parseOptions(this.footerLinks);
	}

	@Watch('socialLinks')
	private processSocialLinks() {
		this.parseOptions(this.socialLinks);
	}

	@Watch('twoColumnOptions')
	private processTwoColumnOptions() {
		this.twoColumnOptions && this.parseOptions(this.twoColumnOptions);
		this.verifyTwoColumnOptions();
	}

	@Watch('threeColumnOptions')
	private processThreeColumnOptions() {
		this.threeColumnOptions && this.parseOptions(this.threeColumnOptions);
		this.verifyThreeColumnOptions();
	}

	private isTwoColumnLayout = (): boolean => this.type === 'twoColumn';
	private isThreeColumnLayout = (): boolean => this.type === 'threeColumn';
	private isExpandedLayout = (): boolean => this.isTwoColumnLayout() || this.isThreeColumnLayout();

	private verifyTwoColumnOptions() {
		if (this.isTwoColumnLayout() && isInvalidTwoColumnOptions(this.twoColumnState)) {
			const message = new ConsoleMessageClass();
			message
				.addDesignSystemTag()
				.addMonospaceText(' twoColumnOptions ')
				.addRegularText('for')
				.addMonospaceText(' <ontario-footer> ')
				.addRegularText('were not fully set. Please review your values and ensure all options are set.')
				.printMessage();
		}
	}

	private verifyThreeColumnOptions() {
		if (this.isThreeColumnLayout() && isInvalidThreeColumnOptions(this.threeColumnState)) {
			const message = new ConsoleMessageClass();
			message
				.addDesignSystemTag()
				.addMonospaceText(' threeColumnOptions ')
				.addRegularText('for')
				.addMonospaceText(' <ontario-footer> ')
				.addRegularText('were not fully set. Please review your values and ensure all options are set.')
				.printMessage();
		}
	}

	private parseOptions(optionType: any) {
		const options = optionType;
		const isString = typeof options === 'string';

		if (!options) {
			return;
		}

		try {
			if (options === this.footerLinks) {
				this.footerLinksState = isString ? JSON.parse(options) : options;
			} else if (options === this.socialLinks) {
				this.socialLinksState = isString ? JSON.parse(options) : options;
			} else if (options === this.twoColumnOptions) {
				this.twoColumnState = isString ? JSON.parse(options) : options;
			} else {
				this.threeColumnState = isString ? JSON.parse(options) : options;
			}
		} catch (error) {
			const message = new ConsoleMessageClass();
			message
				.addDesignSystemTag()
				.addRegularText(' failed to parse props for ')
				.addMonospaceText('<ontario-footer>')
				.addRegularText(' in ')
				.addMonospaceText('parseOptions()')
				.addRegularText(' method \n ')
				.addMonospaceText(error.stack)
				.printMessage(ConsoleType.Error);
		}
	}

	/**
	 * Generate a link to the given image based on the base asset path.
	 * @param imageName Name of the image to build the path to
	 * @returns Path to image with asset path
	 */
	private getImageAssetSrcPath(imageName: string): string {
		return `${this.assetBasePath ? this.assetBasePath : getAssetPath('./assets')}/${imageName}`;
	}

	/**
	 * Generate CSS url to the background image
	 * @returns path to the background image
	 */
	private getBackgroundImagePath(): string {
		const supergraphicLogoFile = this.isExpandedLayout()
			? 'footer-expanded-supergraphic-logo.svg'
			: 'footer-default-supergraphic-logo.svg';

		return `url(${this.getImageAssetSrcPath(supergraphicLogoFile)})`;
	}

	private getFooterClasses() {
		let classes = 'ontario-footer ontario-footer--default';

		if (!this.topMargin) {
			classes = `${classes}  ontario-margin-top-0-!`;
		}

		return classes;
	}

	private getFooterLinks(): SimpleFooterLinks {
		const { language, translations, footerLinksState } = this;
		const { accessibilityLink, privacyLink, contactLink, printerLink } = footerLinksState ?? {};

		const links: SimpleFooterLinks = {
			accessibilityLink: {
				href: accessibilityLink?.href ?? translations.accessibilityLink.link[language],
				text: accessibilityLink?.text ?? translations.accessibilityLink.text[language],
			},
			privacyLink: {
				href: privacyLink?.href ?? translations.privacyLink.link[language],
				text: privacyLink?.text ?? translations.privacyLink.text[language],
			},
			printerLink: {
				href: printerLink?.href ?? translations.printerLink.link[language],
				text: printerLink?.text ?? translations.printerLink.text[language],
			},
		};

		if (contactLink) {
			links['contactLink'] = {
				href: contactLink.href,
				text: contactLink.text ?? translations.contactUs[language],
			};
		}

		return links;
	}

	componentWillLoad() {
		this.processFooterLinks();
		this.processSocialLinks();
		this.processTwoColumnOptions();
		this.processThreeColumnOptions();

		this.language = validateLanguage(this.language);
	}

	render() {
		const { socialLinksState, twoColumnState, threeColumnState, topMargin } = this;
		const footerLinks = this.getFooterLinks();

		if (this.isTwoColumnLayout()) {
			return (
				<ExpandedFooterWrapper
					footerLinks={footerLinks}
					topMargin={topMargin}
					backgroundImagePath={this.getBackgroundImagePath()}
				>
					<FooterColumn data={twoColumnState.column1} />
					<FooterColumn data={twoColumnState.column2} socialLinks={socialLinksState} />
				</ExpandedFooterWrapper>
			);
		}

		if (this.isThreeColumnLayout()) {
			return (
				<ExpandedFooterWrapper
					footerLinks={footerLinks}
					topMargin={topMargin}
					backgroundImagePath={this.getBackgroundImagePath()}
				>
					<FooterColumn data={threeColumnState.column1} isThreeColLayout isFullWidthInMediumLayout />
					<FooterColumn data={threeColumnState.column2} isThreeColLayout />
					<FooterColumn data={threeColumnState.column3} socialLinks={socialLinksState} isThreeColLayout />
				</ExpandedFooterWrapper>
			);
		}

		return (
			<footer class={this.getFooterClasses()} style={{ '--imagePath': this.getBackgroundImagePath() }}>
				<SimpleFooter {...footerLinks} />
			</footer>
		);
	}
}
