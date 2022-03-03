import React from 'react';

export default function TextInputGuidance() {
	return (
		<>
			<div className="ontario-row">
				<div className="ontario-columns ontario-medium-12 ontario-large-12">
					<h2>Use appropriately sized text inputs</h2>

					<p>All text inputs have a height of 48px.</p>

					<p>
						Providing clear <a href="https://designsystem.ontario.ca/components/detail/labels.html">labels</a>, <a href="/ontario-hint-text">hint text</a> and specifying the width
						of the fields <strong>gives the user an indication on how to correctly fill out the input field</strong>. Choose the width of your text input field based on the type of
						information you’re asking for, but never limit the number of characters a user can input.
					</p>

					<h3>Known input length</h3>

					<p>
						Use <strong>fixed-width inputs</strong> for content that has a specific, known length, such as a postal code. Add room for 1 or 2 extra character spaces if users are
						likely to add spaces or dashes. Our standard fixed input widths are:
					</p>

					<ul>
						<p>
							<li>2 characters (use for: date, month)</li>
						</p>
						<p>
							<li>
								3 characters (use for: area code, <abbr title="card verification code">CVC</abbr> on a credit card, age)
							</li>
						</p>
						<p>
							<li>4 characters (use for: year)</li>
						</p>
						<p>
							<li>7 characters (use for: postal code [includes extra character])</li>
						</p>
						<p>
							<li>8 characters (use for: licence plate)</li>
						</p>
						<p>
							<li>
								11 characters (use for: <abbr title="Social Insurance Number">SIN</abbr> [includes extra character])
							</li>
						</p>
					</ul>

					<h3>Unknown input length</h3>

					<p>
						If you don’t know how many characters the user will need to input (for example, if you’re asking them for their name), make your text input{' '}
						<strong>100% of the container</strong>.
					</p>
				</div>
			</div>
		</>
	);
}
