import { h, FunctionalComponent } from '@stencil/core';
import { SimpleFooterLinks } from '../ontario-footer-interface';

const enDash = '\u2013';

type SimpleFooterProps = SimpleFooterLinks & {
	className?: string;
};

export const SimpleFooter: FunctionalComponent<SimpleFooterProps> = ({
	accessibilityLink,
	privacyLink,
	contactLink,
	printerLink,
	className,
}) => {
	return (
		<div class={`ontario-row ${className ?? ''}`}>
			<div class="ontario-columns ontario-small-12">
				<ul class="ontario-footer__links-container ontario-footer__links-container--inline">
					<li>
						<a class="ontario-footer__link" href={accessibilityLink.href}>
							{accessibilityLink.text}
						</a>
					</li>
					<li>
						<a class="ontario-footer__link" href={privacyLink.href}>
							{privacyLink.text}
						</a>
					</li>
					{contactLink && (
						<li>
							<a class="ontario-footer__link" href={contactLink?.href}>
								{contactLink?.text}
							</a>
						</li>
					)}
				</ul>
				<div class="ontario-footer__copyright">
					<a class="ontario-footer__link" href={printerLink?.href}>
						&copy; {printerLink?.text}{' '}
						<span class="ontario-nbsp">
							2012{enDash}
							{String(new Date().getFullYear()).slice(-2)}
						</span>
					</a>
				</div>
			</div>
		</div>
	);
};
