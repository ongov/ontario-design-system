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
import { Language } from '../../utils/language-types';
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
	 * The language of the component. This is used for translations, and is by default
	 * set through event listeners checking for a language property from the header.
	 * Default to English.
	 */
	@Prop({ mutable: true }) language: Language = 'en';

	/**
	 * Type of footer to be rendered
	 * Default: 'default'
	 */
	@Prop() type: OntarioFooterType = 'default';

	/**
	 * Stores the required links for all footers
	 * Available options are 'accessibilityLink', 'privacyLink', 'contactLink' and 'printerLink'
	 */
	@Prop() footerLinks: FooterLinks | string;

	/**
	 * Social media links to render in the footer
	 * Available options are 'facebook', 'twitter', 'instagram' and 'youtube'
	 */
	@Prop() socialLinks: FooterSocialLinksProps | string;

	/**
	 * Stores the titles and content for the expanded
	 * two column footer
	 */
	@Prop() twoColumnOptions?: TwoColumnOptions | string;

	/**
	 * Stores the titles and content for the expanded
	 * three column footer
	 */
	@Prop() threeColumnOptions?: ThreeColumnOptions | string;

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
		this.language = validateLanguage(event);
	}

	@Listen('headerLanguageToggled', { target: 'window' })
	handleHeaderLanguageToggled(event: CustomEvent<Language>) {
		const toggledLanguage = validateLanguage(event);
		this.language = toggledLanguage;
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

	private getBackgroundImage() {
		return { '--imagePath': `url(${getAssetPath('./assets/footer-default-supergraphic-logo.svg')})` };
	}

	private getFooterLinks(): SimpleFooterLinks {
		const { language, translations, footerLinksState } = this;
		const { accessibilityLink, privacyLink, contactLink, printerLink } = footerLinksState;

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
		const { socialLinksState, twoColumnState, threeColumnState } = this;
		const footerLinks = this.getFooterLinks();

		if (this.isTwoColumnLayout()) {
			return (
				<ExpandedFooterWrapper footerLinks={footerLinks}>
					<FooterColumn data={twoColumnState.column1} />
					<FooterColumn data={twoColumnState.column2} socialLinks={socialLinksState} />
				</ExpandedFooterWrapper>
			);
		}

		if (this.isThreeColumnLayout()) {
			return (
				<ExpandedFooterWrapper footerLinks={footerLinks}>
					<FooterColumn data={threeColumnState.column1} isThreeColLayout isFullWidthInMediumLayout />
					<FooterColumn data={threeColumnState.column2} isThreeColLayout />
					<FooterColumn data={threeColumnState.column3} socialLinks={socialLinksState} isThreeColLayout />
				</ExpandedFooterWrapper>
			);
		}

		return (
			<footer class="ontario-footer ontario-footer--default" style={this.getBackgroundImage()}>
				<SimpleFooter {...footerLinks} />
			</footer>
		);
	}
}
