import React from 'react';

export default function DropdownListTechnicalSpecifications() {
	return (
		<div className="ontario-row">
			<div className="ontario-columns ontario-large-12">
				<h2>Technical specifications</h2>
				<p>
					The user’s browser determines how the dropdown list looks and works.{' '}
					<strong>The browser’s default is most accessible</strong> (for example, it will support keyboard input in
					addition to pointing with the mouse), so <strong>do not add any customized styles to dropdown lists</strong>.
				</p>
				<p>
					Dropdown lists (and all form input elements)
					<strong>must include a label with matching ID to be accessible</strong>. Please see the labels guidance to
					ensure your labels are accessible.
				</p>
			</div>
		</div>
	);
}
