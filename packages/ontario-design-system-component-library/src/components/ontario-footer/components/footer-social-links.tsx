import { FunctionalComponent, h } from '@stencil/core';

export type FooterSocialLinksProps = {
	facebook?: string;
	twitter?: string;
	instagram?: string;
	youtube?: string;
};

export const FooterSocialLinks: FunctionalComponent<FooterSocialLinksProps> = ({
	facebook,
	twitter,
	instagram,
	youtube,
}) => {
	return (
		<ul class="ontario-footer__links-container ontario-footer__links-container--social">
			{facebook && (
				<li>
					<a class="ontario-footer__link" href={facebook} aria-label="Facebook">
						<ontario-icon-facebook colour="white" />
					</a>
				</li>
			)}
			{twitter && (
				<li>
					<a class="ontario-footer__link" href={twitter} aria-label="Twitter">
						<ontario-icon-twitter colour="white" />
					</a>
				</li>
			)}
			{instagram && (
				<li>
					<a class="ontario-footer__link" href={instagram} aria-label="Instagram">
						<ontario-icon-instagram colour="white" />
					</a>
				</li>
			)}
			{youtube && (
				<li>
					<a class="ontario-footer__link" href={youtube} aria-label="Youtube">
						<ontario-icon-youtube colour="white" />
					</a>
				</li>
			)}
		</ul>
	);
};
