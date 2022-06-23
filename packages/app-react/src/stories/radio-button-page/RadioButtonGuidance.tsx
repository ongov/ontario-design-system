import React from 'react';

export default function RadioButtonGuidance() {
	return (
		<div className="ontario-row">
			<div className="ontario-columns ontario-medium-12 ontario-large-12">
				<h3>Order of radio button lists</h3>
				<p>
					Put radio button lists in <strong>alphabetical</strong> order, with these exceptions:
				</p>
				<ul>
					<li>
						list <strong>yes before no </strong>
					</li>
					<li>
						if there is an option that you know about 90% or more <strong>of your users</strong> will choose, put that option first
						<ul>
							<li>
								for example, list Ontario first if users are choosing their province from a list
							</li>
							<li>
								be careful not to bias the user's choice or imply the importance of one option over another
							</li>
						</ul>
					</li>
					<li>
						put any <strong>"None of the above" or "I do not know" options last</strong>
					</li>
				</ul>

				<hr></hr>

				<h3>Technical Specifications</h3>

				<h4>Do:</h4>
				<ul>
					<li>
						<strong>always include an associated label with a matching ID</strong> next to each radio button
					</li>
					<li>
						position radio buttons to the <strong>left of their labels</strong>
					</li>
					<li>
						<strong>left-align</strong> radio buttons
					</li>
					<li>
						always make the <strong>label and the radio button selectable</strong>
					</li>
					<li>
						stack radio buttons <strong>vertically</strong>
						<ul>
							<li>
								exception: yes/no can be listed horizontally
							</li>
						</ul>
					</li>
				</ul>

				<h4>Do not:</h4>
				<ul>
					<li>
						change a radio button's <strong>default size</strong> (332px on desktop and 36px on mobile, with a hit area of 48px for both)
					</li>
					<li>
						<strong>pre-select</strong> checkboxes (users might miss the question or submit the wrong answer)
					</li>
				</ul>
			</div>
		</div>
	);
}
