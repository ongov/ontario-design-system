import React from 'react';
import './Home.scss';
import Callout from '../../Prototype-Components/ontario-callouts-and-asides/ontario-callouts';

const Home = () => (
	<>
		<div className="platform-homepage">
			<div className="platform-homepage-banner">
				<div className="ontario-row">
					<div className="platform-homepage-banner--content">
						<h1 className="ontario-h1">Ontario Design System </h1>
						<p className="ontario-lead-statement">
							Use this design system to create accessible and user-centred digital products and services that are consistent with the platform brand.
						</p>
					</div>
				</div>
			</div>

			<div className="ontario-row">
				<div className="ontario-columns ontario-medium-12 ontario-large-12">
					<h2>Overview</h2>
				</div>
				<div className="ontario-columns ontario-medium-12 ontario-large-8 ontario-margin-top-24-!">
					<p>A design system is a collection of building blocks for designing and developing websites and apps.</p>
					<p>The Ontario Design System includes things like buttons, navigation and form fields — and defines how they should look and behave.</p>
					<p>The design system helps you create Government of Ontario products that:</p>
					<div className="ontario-columns ontario-medium-12 ontario-large-12">
						<div className="ontario-lists--two-column-list-md">
							<ul>
								<li>look consistent</li>
								<li>align with the Ontario brand</li>
								<li>use tried-and-tested code</li>
								<li>are accessible</li>
							</ul>
						</div>
					</div>
				</div>

				<div className="ontario-connect ontario-aside ontario-columns ontario-small-11 ontario-medium-11 ontario-large-3">
					<h3 className="ontario-h5">Connect with us</h3>
					<p>
						<a href="https://sb-designsystem.ontariogovernment.ca/alex/docs/help-feedback.html#attend-a-drop-in-session">Join our drop-in sessions</a> to talk shop or get help.{' '}
						<a href="https://medium.com/ontariodigital/tagged/design-systems">You can also read our blog.</a>
					</p>
				</div>
			</div>

			<div className="ontario-row">
				<div className="ontario-columns  ontario-medium-12 ontario-large-12">
					<hr className="dark" />
				</div>
				<div className="ontario-columns  ontario-medium-12 ontario-large-12">
					<h2>Get started</h2>
				</div>
			</div>

			<div className="ontario-row">
				<div className="ontario-columns ontario-medium-6 ontario-large-6 ontario-margin-top-24-!">
					<h3 className="ontario-h4">For designers</h3>
					If you're creating mockups and prototypes, <a href="https://sb-designsystem.ontariogovernment.ca/alex/docs/documentation/for-designers.html">get the Ontario Design System fonts and prototyping kit</a>.
				</div>
				<div className="ontario-columns  ontario-medium-6 ontario-large-6 ontario-margin-top-24-!">
					<h3 className="ontario-h4">For developers</h3>
					If you're coding the website, <a href="https://sb-designsystem.ontariogovernment.ca/alex/docs/documentation/for-developers.html">learn how to install the distribution package and create custom components</a>.
				</div>
			</div>
			<div className="ontario-row">
				<Callout />
			</div>
		</div>
	</>
);
export default Home;
