'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import {
	OntarioButton,
	OntarioCheckboxes,
	OntarioDateInput,
	OntarioDropdownList,
	OntarioErrorAlert,
	OntarioErrorMessage,
	OntarioFormContainer,
	OntarioInput,
	OntarioRadioButtons,
	OntarioTextarea,
} from '@ongov/ontario-design-system-component-library-react';
import { validateDateFields } from '@ongov/ontario-design-system-component-library/date-validation';
import { Grid } from '../../grid';
import './styles.scss';

const regionOptions = [
	{ value: 'north', label: 'Northern Ontario' },
	{ value: 'south', label: 'Southern Ontario' },
];
const serviceOptions = [
	{ value: 'licensing', label: 'Licensing', elementId: 'service-licensing' },
	{ value: 'registration', label: 'Registration', elementId: 'service-registration' },
];
const contactOptions = [
	{ value: 'email', label: 'Email', elementId: 'contact-email' },
	{ value: 'phone', label: 'Phone', elementId: 'contact-phone' },
];
const skipInternalDateValidation = () => ({ dayInvalid: false, monthInvalid: false, yearInvalid: false });

type FormControl =
	| HTMLOntarioInputElement
	| HTMLOntarioTextareaElement
	| HTMLOntarioDropdownListElement
	| HTMLOntarioCheckboxesElement
	| HTMLOntarioRadioButtonsElement;

function getElement<T extends HTMLElement>(id: string): T {
	const element = document.getElementById(id);
	if (!element) throw new Error(`The ${id} control is not ready for validation.`);
	return element as T;
}

function validateControl(id: string, message: string): boolean {
	const control = getElement<FormControl>(id);
	const value = control.value;
	const invalid = Array.isArray(value) ? value.length === 0 : !value?.trim();
	control.errorMessage = invalid ? message : '';
	return invalid;
}

const controls = [
	['name-control', 'Enter your full name.'],
	['details-control', 'Enter your request details.'],
	['region-control', 'Select a region.'],
	['services-control', 'Select at least one service.'],
	['contact-control', 'Select a preferred contact method.'],
] as const;

export default function IntegratedErrorExample() {
	const dateFields = useRef({ day: '', month: '', year: '' });
	const liveValidationRef = useRef(true);
	const [liveValidation, setLiveValidation] = useState(true);
	const [dateResetKey, setDateResetKey] = useState(0);
	const [emailError, setEmailError] = useState('');
	const [announceEmail, setAnnounceEmail] = useState(true);
	const [result, setResult] = useState('');

	function validateDate(): boolean {
		const date = getElement<HTMLOntarioDateInputElement>('date-control');
		const { errorMessage } = validateDateFields(dateFields.current);
		date.externalErrorMessage = errorMessage || (!date.value ? 'Enter a valid date.' : '');
		return !!date.externalErrorMessage;
	}

	function validateEmail(): boolean {
		const invalid = !getElement<HTMLInputElement>('native-email').validity.valid;
		setEmailError(invalid ? 'Enter a valid email address, such as name@example.ca.' : '');
		return invalid;
	}

	useEffect(() => {
		const onInput = (event: Event) => {
			if (!(event.target instanceof HTMLElement) || event.target.id !== 'date-control') return;
			const { fieldType, value } = (event as CustomEvent<{ fieldType: 'day' | 'month' | 'year'; value: string }>)
				.detail;
			dateFields.current[fieldType] = value;
		};
		const onBlur = (event: Event) => {
			if (!(event.target instanceof HTMLElement) || event.target.id !== 'date-control' || !liveValidationRef.current)
				return;
			setResult('');
			validateDate();
		};
		document.addEventListener('inputOnInput', onInput);
		document.addEventListener('inputOnBlur', onBlur);
		return () => {
			document.removeEventListener('inputOnInput', onInput);
			document.removeEventListener('inputOnBlur', onBlur);
		};
	}, []);

	function handleBlur(id: string, message: string) {
		if (!liveValidationRef.current) return;
		setResult('');
		validateControl(id, message);
	}

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const summary = getElement<HTMLOntarioErrorAlertElement>('integrated-error-summary');
		setResult('');
		await summary.show();
		const errors = controls.map(([id, message]) => validateControl(id, message));
		errors.push(validateDate());
		setAnnounceEmail(false);
		const emailInvalid = validateEmail();
		if (!errors.some(Boolean)) {
			await summary.hide();
			if (emailInvalid) getElement<HTMLInputElement>('native-email').focus();
			else setResult('All fields are valid. This demonstration did not submit any information.');
		}
	}

	async function handleReset(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		await getElement<HTMLOntarioErrorAlertElement>('integrated-error-summary').hide();
		for (const [id] of controls) {
			const control = getElement<FormControl>(id);
			control.value = id === 'services-control' ? [] : '';
			control.errorMessage = '';
		}
		dateFields.current = { day: '', month: '', year: '' };
		setDateResetKey((key) => key + 1);
		getElement<HTMLInputElement>('native-email').value = '';
		setEmailError('');
		setAnnounceEmail(true);
		setResult('Example reset.');
	}

	return (
		<main>
			<Grid>
				<OntarioErrorAlert id="integrated-error-summary" formId="integrated-error-form" />
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
					Use a standalone error message for native fields. For ODS controls, set the control&apos;s error property
					instead of adding a second message.
				</p>
				<hr />
				<h2>Example</h2>
				<p id="integrated-scope">
					Submit the form to see inline errors and an error summary. The summary collects Ontario Design System control
					errors; the native email field uses a standalone error message. No information is sent or stored.
				</p>
				<div className="ontario-form-group">
					<div className="integrated-error-example__live-validation">
						<input
							id="live-validation"
							type="checkbox"
							checked={liveValidation}
							aria-describedby="live-validation-hint"
							onChange={(event) => {
								liveValidationRef.current = event.target.checked;
								setLiveValidation(event.target.checked);
							}}
						/>
						<label htmlFor="live-validation">Enable live validation</label>
					</div>
					<p id="live-validation-hint">
						When disabled, errors update on submit instead of on blur. Existing errors remain until the next validation.
					</p>
				</div>
				<form
					id="integrated-error-form"
					noValidate
					aria-describedby="integrated-scope"
					onSubmit={handleSubmit}
					onReset={handleReset}
				>
					<OntarioFormContainer>
						<OntarioInput
							id="name-control"
							key="name"
							elementId="name-field"
							name="fullName"
							caption="Full name"
							required
							hintText="Enter your first and last name."
							customOnBlur={() => handleBlur(...controls[0])}
						/>
						<OntarioTextarea
							id="details-control"
							key="details"
							elementId="details-field"
							name="details"
							caption="Request details"
							required
							customOnBlur={() => handleBlur(...controls[1])}
						/>
						<OntarioDropdownList
							id="region-control"
							key="region"
							elementId="region-field"
							name="region"
							caption="Region"
							required
							isEmptyStartOption
							options={regionOptions}
							customOnBlur={() => handleBlur(...controls[2])}
						/>
						<OntarioCheckboxes
							id="services-control"
							key="services"
							name="services"
							caption="Services"
							required
							hintText="Select at least one service."
							options={serviceOptions}
							customOnBlur={() => handleBlur(...controls[3])}
						/>
						<OntarioRadioButtons
							id="contact-control"
							key="contact"
							name="contactMethod"
							caption="Preferred contact method"
							required
							options={contactOptions}
							customOnBlur={() => handleBlur(...controls[4])}
						/>
						<OntarioDateInput
							key={dateResetKey}
							id="date-control"
							elementId="date-field"
							caption="Requested date"
							required
							hintText="Enter a complete, valid date."
							dateValidator={skipInternalDateValidation}
						/>
						<div key="native-email" className="ontario-form-group integrated-error-example__native">
							<h4>Email address (native HTML input, excluded from summary)</h4>
							<label className="ontario-label" htmlFor="native-email">
								Email address (native HTML input)
							</label>
							<p className="ontario-hint" id="native-email-hint">
								For example, name@example.ca.
							</p>
							<OntarioErrorMessage id="native-email-error" message={emailError} announce={announceEmail} />
							<input
								className="ontario-input"
								id="native-email"
								name="email"
								type="email"
								autoComplete="email"
								required
								aria-invalid={emailError ? 'true' : undefined}
								aria-describedby={emailError ? 'native-email-hint native-email-error' : 'native-email-hint'}
								onBlur={() => {
									if (!liveValidationRef.current) return;
									setResult('');
									setAnnounceEmail(true);
									validateEmail();
								}}
							/>
						</div>
						<div key="actions" className="integrated-error-example__actions">
							<OntarioButton type="secondary" htmlType="reset">
								Reset
							</OntarioButton>
							<OntarioButton type="primary" htmlType="submit">
								Submit
							</OntarioButton>
						</div>
					</OntarioFormContainer>
				</form>
				<p role="status">{result}</p>
				<h2>Guidance</h2>
				<h3>Error summary</h3>
				<ul>
					<li>
						Place the summary above the page&apos;s top-level heading, move focus to it after validation fails, and
						prefix the page title with “Error: ”.
					</li>
					<li>
						Link each error to its control, use the same text inline, and explain how to correct it without clearing
						entered values.
					</li>
				</ul>
				<h3>Inline errors</h3>
				<ul>
					<li>Place clear, helpful messages after hints and directly above the field or group.</li>
					<li>
						Preserve hint and error IDs in <code>aria-describedby</code> and set <code>aria-invalid</code> while
						invalid.
					</li>
				</ul>
				<h2>Technical specifications</h2>
				<ul>
					<li>The application owns validation, submission, page-title updates, and setting and clearing errors.</li>
					<li>
						Use <code>formId</code> to associate a summary outside its form. Call <code>show()</code> after validation
						fails, <code>hide()</code> to hide it, and <code>refresh()</code> to rediscover controls.
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
			</Grid>
		</main>
	);
}
