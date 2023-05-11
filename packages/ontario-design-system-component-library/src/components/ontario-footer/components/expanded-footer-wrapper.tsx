import { FunctionalComponent, h, getAssetPath } from '@stencil/core';
import { SimpleFooter } from './simple-footer';
import { SimpleFooterLinks } from '../ontario-footer-interface';

export type ExpandedFooterWrapperProps = {
	footerLinks: SimpleFooterLinks;
};

export const ExpandedFooterWrapper: FunctionalComponent<ExpandedFooterWrapperProps> = (props, children) => {
	const style = { '--imagePath': `url(${getAssetPath('./assets/footer-expanded-supergraphic-logo.svg')})` };

	return (
		<footer class="ontario-footer ontario-footer--expanded" style={style}>
			<div class="ontario-footer__expanded-top-section">
				<div class="ontario-row">{children}</div>
			</div>
			<SimpleFooter {...props.footerLinks} className="ontario-footer__expanded-bottom-section" />
		</footer>
	);
};
