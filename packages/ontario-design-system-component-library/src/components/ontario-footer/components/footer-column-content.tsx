import { FunctionalComponent, h, Fragment } from '@stencil/core';
import { FooterColumnContent } from '../ontario-footer-interface';

export type FooterColumnContentProps = {
	content: FooterColumnContent;
};

export const ColumnContent: FunctionalComponent<FooterColumnContentProps> = ({ content }) => {
	const { heading, headingLevel: Heading = 'h3', text, html, list, type = 'text' } = content;

	return (
		<Fragment>
			{heading && <Heading class="ontario-h5">{heading}</Heading>}
			{type === 'text' && <p>{text}</p>}
			{type === 'html' && <div class="ontario-footer__paragraph" innerHTML={html as string} />}
			{type === 'list' && !!list?.length && (
				<ul>
					{list.map((item: string) => (
						<li class="ontario-footer__list_item" innerHTML={item} />
					))}
				</ul>
			)}
		</Fragment>
	);
};
