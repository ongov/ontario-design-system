import React from 'react';

export default function IconWhenToUse() {
	return (
		<div className="ontario-row">
			<div className="ontario-columns ontario-large-12">
				<h1>Icons</h1>
				<p className="ontario-lead-statement">
					Use simple, easy-to-understand icons from Material Design to help guide users.
				</p>

				<h2>General icon guidance</h2>
				<p>
					Icons are a visual representation of a <strong>single and simple object, action or idea</strong>. If you need
					to communicate more complicated concepts, consider an illustration or infographic.
				</p>

				<h3>The Ontario Design System icon library</h3>
				<p>The Ontario Design System icon library is made up of two sets:</p>
				<ul>
					<li>
						Primary – these represent the most commonly used concepts on our services (such as phone, menu, search)
					</li>
					<li>
						Secondary – these represent concepts that are used often but not as frequently (such as attach, print, map
						pin)
					</li>
				</ul>

				<h4>If you need a different icon</h4>
				<p>
					If the concept you need to represent isn’t already in our icon library, you can choose one from the Google
					Material Design:
				</p>
				<ul>
					<li>icon library (use the filled versions)</li>
					<li>community-led iconography library</li>
				</ul>

				<p>
					Please let the design system team know any time you need an icon that isn’t in our icon library. If we find
					the same ones are being commonly used, we’ll consider adding them to the library.
				</p>
				<hr />

				<h3>Why we chose these icons</h3>
				<p>
					The Ontario Design System follows the Material Design system icon design principles and uses icons from
					Material Design’s icon library.
				</p>

				<p>We’ve chosen the icons for our library based on proven best practices that all icons we use must be:</p>

				<ul>
					<li>
						a visual representation of a <strong>single</strong> object, action, or idea
					</li>
					<li>
						easily <strong>recognizable and understandable</strong>
					</li>
					<li>
						likely to be <strong>interpreted in the same way</strong> by users
					</li>
					<li>
						used to represent <strong>“universal recognition”</strong> as opposed to “universal representation”
						<ul>
							<li>
								for example, a wheelchair is often used for accessibility even though it does not represent all types of
								disabilities
							</li>
						</ul>
					</li>
					<li>
						<strong>useful</strong>
						<ul>
							<li>
								icons should help guide the user to accomplish their task – don’t use icons purely for visual interest
							</li>
						</ul>
					</li>
				</ul>
				<hr />
			</div>
		</div>
	);
}
