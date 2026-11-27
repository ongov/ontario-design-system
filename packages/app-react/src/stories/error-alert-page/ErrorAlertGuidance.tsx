export default function ErrorAlertGuidance() {
	return (
		<div className="ontario-row">
			<div className="ontario-columns ontario-large-12">
				<h2>Guidance</h2>
				<h3>Error summary</h3>
				<ul>
					<li>
						Place the summary above the page&apos;s top-level heading and use “There is a problem” as the heading.
					</li>
					<li>Move focus to the summary after validation fails and prefix the page title with “Error: ”.</li>
					<li>Link each error to its control, and use the same text in the summary and inline message.</li>
					<li>Explain what went wrong and how the user can correct it without clearing their entered values.</li>
				</ul>
				<h3>Inline errors</h3>
				<ul>
					<li>Place the message after any hint text and directly above the field or group.</li>
					<li>Use clear, concise and helpful language; do not blame the user or use tooltips.</li>
					<li>
						Preserve hint and error IDs in <code>aria-describedby</code> and set <code>aria-invalid</code> while
						invalid.
					</li>
				</ul>
				<hr />
				<h2>Technical specifications</h2>
				<ul>
					<li>The application owns validation, submission, page-title updates, and setting and clearing errors.</li>
					<li>
						Use <code>formId</code> to associate a summary outside its form. Call <code>show()</code> after validation
						fails; <code>hide()</code> hides the summary without clearing errors, and <code>refresh()</code> rediscovers
						controls.
					</li>
					<li>
						The summary collects errors from ODS inputs, textareas, dropdowns, checkbox groups, radio groups and date
						inputs. Standalone native fields are not collected.
					</li>
					<li>
						Use <code>noValidate</code> to prevent browser validation bubbles from competing with application messages.
						Server-side validation remains required.
					</li>
					<li>
						Coordinate live announcements to avoid duplicates. Live validation is optional and should be used where it
						adds value.
					</li>
				</ul>
			</div>
		</div>
	);
}
