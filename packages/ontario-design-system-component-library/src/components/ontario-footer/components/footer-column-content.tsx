import { FunctionalComponent, h, Fragment } from '@stencil/core';
import { FooterColumnContent } from '../ontario-footer-interface';

export type FooterColumnContentProps = {
	content: FooterColumnContent;
};

export const ColumnContent: FunctionalComponent<FooterColumnContentProps> = ({ content }) => {
	const { heading, text, html, list, type } = content;

	return (
		<Fragment>
			{heading && <h3 class="ontario-h5">{heading}</h3>}
			{type === 'text' && <p>{text}</p>}
			{type === 'html' && <div class="ontario-footer__paragraph" innerHTML={html} />}
			{type === 'list' && !!list?.length && (
				<ul>
					{list.map((item: string) => (
						<li>
							<div class="ontario-footer__list_item" innerHTML={item}></div>
						</li>
					))}
				</ul>
			)}
		</Fragment>
	);
};
