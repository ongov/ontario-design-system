import React from 'react';

const BlockquoteWhenToUse = () => {
	return (
		<div className="ontario-row">
			<div className="ontario-columns ontario-large-12">
				<h1>Blockquote</h1>
				<p className="ontario-lead-statement">Use a blockquote to draw attention to a speaker quote or excerpt.</p>

				<h2>When to use this component</h2>
				<p>
					Blockquotes are used to indicate that a piece of content is a <strong>quotation</strong> from a source or
					speaker. This often includes a cite attribute for the URL of the quote’s source or the speaker’s name, to
					provide context.
				</p>

				<h3 className="ontario-h4">Do:</h3>
				<ul>
					<li>keep text brief - aim for a maximum of 280 characters</li>
					<li>consider if the blockquote adds value to the page</li>
					<li>minimize the use of blockquotes on a page - avoid stacking them if possible</li>
				</ul>

				<h3 className="ontario-h4">Don't:</h3>
				<ul>
					<li>
						include quotation marks in your blockquote copy – the blockquote style will add the quotation marks for you
					</li>
				</ul>
				<hr />
			</div>
		</div>
	);
};

export default BlockquoteWhenToUse;
