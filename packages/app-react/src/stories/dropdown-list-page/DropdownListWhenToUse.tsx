import React from 'react';

export default function DropdownListWhenToUse() {
	return (
		<>
			<div className="ontario-row">
				<div className="ontario-columns ontario-large-12">
					<h1 className="ontario-h1">Dropdown List</h1>
					<p className="ontario-lead-statement">
						Only use a dropdown (select) list if you cannot use other form components to capture the user’s information.
					</p>

					<h2>When to use this component</h2>
					<p>
						Because some users find them <strong>hard to navigate</strong>, only use dropdown lists (also known as
						“select boxes”) when you:
					</p>
					<ul>
						<li>
							want the user to choose from a <strong>set list of options</strong>
						</li>
						<li>
							cannot adequately capture the information using <strong>other form elements</strong> such as radio buttons
							or a text input field
						</li>
					</ul>

					<p>Dropdown lists usually work well for inputs where:</p>
					<ul>
						<li>
							there is a <strong>specific set of options</strong>
						</li>
						<li>
							<strong>only one</strong> option can be selected
						</li>
						<li>
							there are only <strong>7 to 15 options</strong>
						</li>
					</ul>
					<hr />
				</div>
			</div>
		</>
	);
}
