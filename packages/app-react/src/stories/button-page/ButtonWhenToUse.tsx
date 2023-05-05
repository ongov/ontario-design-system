import React from 'react';

export default function ButtonWhenToUse() {
	return (
		<>
			<div className="ontario-row">
				<div className="ontario-columns ontario-large-12">
					<h1 className="ontario-h1">Buttons</h1>
					<p className="ontario-lead-statement">
						Use buttons to help the user carry out an important action such as starting a transaction or agreeing to a
						purchase.
					</p>

					<h2>When to use this component</h2>
					<p>
						Use buttons when you want the user to <strong>do</strong> something (often called a “call to action”), for
						example:
					</p>
					<ul>
						<li>start an application process or a transaction</li>
						<li>agree to make a payment</li>
						<li>download a PDF</li>
					</ul>
					<p>
						Don’t use a button when you’re not encouraging an action. Buttons{' '}
						<strong>should not be used the same way as links</strong>, which usually send the user to another page or to
						a different part of the same page.
					</p>
					<hr />
				</div>
			</div>
		</>
	);
}
