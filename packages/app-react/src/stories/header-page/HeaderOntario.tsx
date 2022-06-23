import React from 'react';

export default function HeaderOntario() {
	return (
		<div className="ontario-row">
			<div className="ontario-columns ontario-medium-12 ontario-large-12">
				<h2>Ontario Header</h2>
        <p>This header is mandatory for all pages that are part of the main ontario.ca website.</p>

        <h3>When to use this component</h3>
				<p>This header is only used for pages that are:</p>
        <ul>
          <li>
            created on the ontario.ca content management system
          </li>
          <li>
            integrated into the main ontario.ca website environment
          </li>
        </ul>
				<p>
          The use of this header is very specific. In most cases, if you’re creating an application or subsite, you should use the application header.
        </p>

        <hr></hr>

        <h3>Features</h3>
        <p>The ontario.ca header includes:</p>
        <ul>
          <li>
            black bar
          </li>
          <li>
            Ontario logo
          </li>
          <li>
            language toggle
          </li>
          <li>
            ontario.ca search bar
          </li>
          <li>
            ontario.ca menu
          </li>
        </ul>

        <p>
          The search and menu in this header connect to pages that are part of the information architecture of the main ontario.ca website.
        </p>

        <hr></hr>

        <h3>Best practices</h3>
        <h4>Do</h4>
        <ul>
          <li>
            link the Ontario logo in the black bar to either the English or French ontario.ca landing page (depending on the language of the page)
          </li>
          <li>
            ensure the language toggle is inside the black bar
          </li>
          <li>
            ensure the language toggle switches you to the other language of the page you’re on
          </li>
        </ul>

        <h4>Don’t</h4>
        <ul>
          <li>
            customize the ontario.ca header in any way
          </li>
          <li>
            copy the ontario.ca header design and customize the search or menu items
          </li>
        </ul>
			</div>
		</div>
	);
}
