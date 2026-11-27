export default function ErrorAlertWhenToUse() {
	return (
		<div className="ontario-row">
			<div className="ontario-columns ontario-large-12">
				<h1>Error alert and inline errors</h1>
				<p className="ontario-lead-statement">
					Help users understand and correct form errors with an error summary and clear inline messages.
				</p>
				<h2>When to use these components</h2>
				<p>
					Use an error alert to summarize form errors after validation fails, even when there is only one error. Provide
					an inline error above each affected field or group.
				</p>
				<p>
					Use the standalone error message with a native field that does not already display an error through an Ontario
					Design System control. For ODS controls, set the control&apos;s error property instead of adding a second
					message.
				</p>
				<hr />
			</div>
		</div>
	);
}
