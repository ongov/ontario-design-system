import React from 'react';

export default function CheckboxGuidance() {
	return (
		<div className="ontario-row">
			<div className="ontario-columns ontario-large-12">
				<h2>Order of checkbox lists</h2>
				<p>
					Put checkbox lists in <strong>alphabetical</strong> order, with these exceptions:
				</p>
				<ul>
					<li>
						list <strong>yes before no </strong>
					</li>
					<li>
						if there is an option that you know about 90% or more <strong>of your users</strong> will choose, put that
						option first
						<ul>
							<li>for example, list Ontario first if users are choosing their province from a list</li>
							<li>be careful not to bias the user's choice or imply the importance of one option over another</li>
						</ul>
					</li>
					<li>
						put any <strong>"None of the above" or "I do not know" options last</strong>
					</li>
				</ul>

				<hr />

				<h2>Technical Specifications</h2>

				<h3 className="ontario-h4">Do:</h3>
				<ul>
					<li>
						<strong>always include an associated label with a matching ID</strong> next to each checkbox
					</li>
					<li>
						position checkboxes to the <strong>left of their labels</strong>
					</li>
					<li>
						<strong>left-align</strong> checkboxes
					</li>
					<li>
						always make the <strong>label and the checkbox selectable</strong>
					</li>
					<li>
						stack checkbox <strong>vertically</strong>
						<ul>
							<li>exception: yes/no can be listed horizontally</li>
						</ul>
					</li>
				</ul>

				<h3 className="ontario-h4">Do not:</h3>
				<ul>
					<li>
						change a checkbox's <strong>default size</strong> (32px by 32px)
					</li>
					<li>
						<strong>pre-select</strong> checkboxes (users might miss the question or submit the wrong answer)
					</li>
				</ul>
			</div>
		</div>
	);
}
