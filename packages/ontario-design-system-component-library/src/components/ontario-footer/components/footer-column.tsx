import { FunctionalComponent, h } from '@stencil/core';
import { FooterColumnData } from '../ontario-footer-interface';
import { ColumnContent } from './footer-column-content';
import { FooterSocialLinks, FooterSocialLinksProps } from './footer-social-links';

export type FooterColumnProps = {
	data: FooterColumnData;
	socialLinks?: FooterSocialLinksProps;
	isThreeColLayout?: boolean;
	isFullWidthInMediumLayout?: boolean;
};

export const FooterColumn: FunctionalComponent<FooterColumnProps> = ({
	data,
	socialLinks,
	isThreeColLayout = false,
	isFullWidthInMediumLayout = false,
}) => {
	const { title, content, button } = data;
	const threeColumnLayoutClasses = isThreeColLayout ? 'ontario-large-4 ontario-expanded-footer__one-third-block' : '';
	const mediumLayoutClasses = isFullWidthInMediumLayout ? 'ontario-medium-12' : 'ontario-medium-6';

	return (
		<div class={`ontario-columns ontario-small-12 ${mediumLayoutClasses} ${threeColumnLayoutClasses}`}>
			<h2 class="ontario-h4">{title}</h2>
			{content.map((item) => (
				<ColumnContent content={item} />
			))}
			{button && (
				<a href={button?.link}>
					<ontario-button aria-label="Secondary Button" type="internalThemeDark" htmlType="reset" id="secondaryButton">
						{button?.text}
					</ontario-button>
				</a>
			)}
			{socialLinks && <FooterSocialLinks {...socialLinks} />}
		</div>
	);
};
