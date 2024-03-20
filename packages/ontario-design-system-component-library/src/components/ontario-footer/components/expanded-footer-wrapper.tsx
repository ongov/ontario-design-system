import { FunctionalComponent, h, getAssetPath } from '@stencil/core';
import { SimpleFooter } from './simple-footer';
import { SimpleFooterLinks } from '../ontario-footer-interface';

export type ExpandedFooterWrapperProps = {
	footerLinks: SimpleFooterLinks;
	topMargin: boolean;
	backgroundImagePath: string;
};

export const ExpandedFooterWrapper: FunctionalComponent<ExpandedFooterWrapperProps> = (props, children) => {
	const { topMargin, footerLinks, backgroundImagePath } = props;
	const style = { '--imagePath': backgroundImagePath };
	const marginClass = !topMargin ? 'ontario-margin-top-0-!' : '';

	return (
		<footer class={`ontario-footer ontario-footer--expanded ${marginClass}`} style={style}>
			<div class="ontario-footer__expanded-top-section">
				<div class="ontario-row">{children}</div>
			</div>
			<SimpleFooter {...footerLinks} className="ontario-footer__expanded-bottom-section" />
		</footer>
	);
};
