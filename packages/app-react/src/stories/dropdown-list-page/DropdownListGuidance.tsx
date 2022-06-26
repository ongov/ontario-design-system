import React from 'react';

export default function DropdownListGuidance() {
	return (
		<div className="ontario-row">
			<div className="ontario-columns ontario-medium-12 ontario-large-12">
				<h3>Options in dropdown lists</h3>
				<p>
					In general, options should be <strong>intuitive</strong> for users but should <strong>not bias</strong> them towards a specific answer.
				</p>

				<h4>Number of options</h4>
				<p>
					Dropdown lists work best for lists with <strong>7 to 15 options</strong>. If there are:
				</p>
				<ul>
					<li>fewer than 7 options, use a list of radio buttons instead</li>
					<li>more than 15 options, consider a text input field with predicted/type-ahead options</li>
				</ul>

				<h4>Order of options</h4>
				<p>
					Dropdown list options should be listed <strong>alphabetically</strong> unless there is another logical order. For example, if you’re listing provinces, it would be
					logical to put Ontario at the top.
				</p>
				<p>
					Put any <strong>“None of the above” or “I do not know” options last.</strong>
				</p>

				<h4>Choosing a default option</h4>
				<p>The “default option” is what appears in the dropdown list before the user clicks on it.</p>
				<p>
					<strong>Never</strong> leave the default option <strong>blank</strong>.
				</p>
				<p>
					If the purpose of the dropdown list is to <strong>filter results</strong>, use the “all” option as the default. For example, this code example shows “All categories” as
					the default option:
				</p>
			</div>
		</div>
	);
}
