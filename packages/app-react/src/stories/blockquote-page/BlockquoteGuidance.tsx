import React from 'react';

const BlockquoteGuidance = () => {
	return (
		<div className="ontario-row">
			<div className="ontario-columns ontario-medium-12 ontario-large-12">
				<h2>Blockquote sizes</h2>
				<p>
					The size of the blockquote is determined by the length of the quote passed into the web component. Depending
					on the length, either a short or long blockquote will be rendered through the component styles. The size of
					the blockquote is determined as followed:
				</p>
				<ul>
					<li>
						Long blockquotes will be rendered when the quote is between <strong>140 and 280 characters</strong>{' '}
						(including spaces)
					</li>
					<li>
						Short blockquotes will be rendered when the quote is a <strong>maximum of 140 characters</strong> or less
						(including spaces)
					</li>
				</ul>
			</div>
		</div>
	);
};

export default BlockquoteGuidance;
