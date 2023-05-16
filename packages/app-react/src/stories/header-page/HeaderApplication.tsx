import React from 'react';

export default function HeaderApplication() {
	return (
		<div className="ontario-row">
			<div className="ontario-columns ontario-large-12">
				<h1>Headers</h1>
				<h2>Application Header</h2>
				<p>This header is for applications and subsites outside of the main ontario.ca website.</p>

				<h2>When to use this component</h2>
				<p>This header is used for applications or subsites that are not part of the main ontario.ca website.</p>
				<p>The application header is used for an application or subsite that may have any of the following:</p>
				<ul>
					<li>a specific application or subsite name</li>
					<li>navigation or subpages</li>
					<li>its own search</li>
					<li>user accounts or its own login system</li>
				</ul>

				<p>This header applies Ontario branding to your product while providing:</p>
				<ul>
					<li>a clear application or subsite identity</li>
					<li>a place for application or subsite-specific links or a menu, if needed</li>
				</ul>

				<h3>Features</h3>
				<p>The application header includes:</p>
				<ul>
					<li>
						black bar with:
						<ul>
							<li>smaller version of the Ontario logo</li>
							<li>language toggle</li>
						</ul>
					</li>
					<li>
						secondary grey application bar with:
						<ul>
							<li>application name</li>
							<li>navigation links</li>
							<li>site menu</li>
						</ul>
					</li>
				</ul>

				<h3>Best practices</h3>
				<h4>Do</h4>
				<ul>
					<li>limit the number of navigation links (maximum seven) and keep the labels concise</li>
					<li>
						place application-specific menus or search in the secondary application bar to emphasize that the functions
						are not related to the enterprise ontario.ca website
					</li>
					<li>link the application name in the secondary application bar to the application landing page</li>
					<li>
						link the Ontario logo in the black bar to either the English or French ontario.ca landing page (depending on
						the language of the application page)
					</li>
					<li>ensure the language toggle is inside the black bar</li>
					<li>ensure the language toggle switches you to the other language of the page you’re on</li>
				</ul>

				<h4>Don’t</h4>
				<ul>
					<li>
						use the application header parts separately — that is, don’t use the modified black bar or the secondary
						application bar separately on its own
					</li>
					<li>use the secondary application bar as an area for additional branding (logos, patterns, images)</li>
					<li>change the secondary application bar colour</li>
					<li>change the font size for the application name — if the name is long, the text will wrap automatically</li>
				</ul>
			</div>
		</div>
	);
}
