import { useEffect, useRef, useState, type FormEvent, type RefObject } from 'react';
import {
	OntarioButton,
	OntarioCheckboxes,
	OntarioDateInput,
	OntarioDropdownList,
	OntarioErrorMessage,
	OntarioFormContainer,
	OntarioInput,
	OntarioRadioButtons,
	OntarioTextarea,
	validateDateFields,
} from '@ongov/ontario-design-system-component-library-react';
import CodeHighlighter from '../../components/code-highlighter';
import './ErrorAlertExample.scss';

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

export default function ErrorAlertExample({ summary }: { summary: RefObject<HTMLOntarioErrorAlertElement | null> }) {
	const name = useRef<HTMLOntarioInputElement>(null);
	const details = useRef<HTMLOntarioTextareaElement>(null);
	const region = useRef<HTMLOntarioDropdownListElement>(null);
	const services = useRef<HTMLOntarioCheckboxesElement>(null);
	const contact = useRef<HTMLOntarioRadioButtonsElement>(null);
	const date = useRef<HTMLOntarioDateInputElement>(null);
	const dateFields = useRef({ day: '', month: '', year: '' });
	const email = useRef<HTMLInputElement>(null);
	const [liveValidation, setLiveValidation] = useState(true);
	const [dateResetKey, setDateResetKey] = useState(0);
	const [emailError, setEmailError] = useState('');
	const [announceEmail, setAnnounceEmail] = useState(true);
	const [result, setResult] = useState('');
	const liveValidationRef = useRef(liveValidation);
	liveValidationRef.current = liveValidation;

	function validateControl(
		control:
			| HTMLOntarioInputElement
			| HTMLOntarioTextareaElement
			| HTMLOntarioDropdownListElement
			| HTMLOntarioCheckboxesElement
			| HTMLOntarioRadioButtonsElement,
		message: string,
	): boolean {
		const value = control.value;
		const valid = Array.isArray(value) ? value.length > 0 : !!value?.trim();
		control.errorMessage = valid ? '' : message;
		return !valid;
	}

	function validateDate(control: HTMLOntarioDateInputElement): boolean {
		const { errorMessage } = validateDateFields(dateFields.current);
		control.externalErrorMessage = errorMessage || (!control.value ? 'Enter a valid date.' : '');
		return !!control.externalErrorMessage;
	}

	function validateEmail(): boolean {
		const invalid = !email.current?.validity.valid;
		setEmailError(invalid ? 'Enter a valid email address, such as name@example.ca.' : '');
		return invalid;
	}

	useEffect(() => {
		const dateControl = date.current;
		if (!dateControl) return;

		dateControl.dateValidator = () => ({ dayInvalid: false, monthInvalid: false, yearInvalid: false });
		const onInput = (event: Event) => {
			const { fieldType, value } = (event as CustomEvent<{ fieldType: 'day' | 'month' | 'year'; value: string }>)
				.detail;
			dateFields.current[fieldType] = value;
		};
		const onBlur = () => {
			if (!liveValidationRef.current) return;
			setResult('');
			validateDate(dateControl);
		};
		dateControl.addEventListener('inputOnBlur', onBlur);
		dateControl.addEventListener('inputOnInput', onInput);
		return () => {
			dateControl.removeEventListener('inputOnBlur', onBlur);
			dateControl.removeEventListener('inputOnInput', onInput);
		};
	}, [dateResetKey]);

	function handleBlur(
		control:
			| HTMLOntarioInputElement
			| HTMLOntarioTextareaElement
			| HTMLOntarioDropdownListElement
			| HTMLOntarioCheckboxesElement
			| HTMLOntarioRadioButtonsElement
			| null,
		message: string,
	) {
		if (!liveValidationRef.current || !control) return;
		setResult('');
		validateControl(control, message);
	}

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (
			!summary.current ||
			!name.current ||
			!details.current ||
			!region.current ||
			!services.current ||
			!contact.current ||
			!date.current ||
			!email.current
		) {
			throw new Error('The form controls are not ready for validation.');
		}
		setResult('');
		await summary.current.show();
		const errors = [
			validateControl(name.current, 'Enter your full name.'),
			validateControl(details.current, 'Enter your request details.'),
			validateControl(region.current, 'Select a region.'),
			validateControl(services.current, 'Select at least one service.'),
			validateControl(contact.current, 'Select a preferred contact method.'),
			validateDate(date.current),
		];
		setAnnounceEmail(false);
		const emailInvalid = validateEmail();
		if (!errors.some(Boolean)) {
			await summary.current.hide();
			if (emailInvalid) email.current.focus();
			else setResult('All fields are valid. This demonstration did not submit any information.');
		}
	}

	async function handleReset(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		await summary.current?.hide();
		for (const control of [name.current, details.current, region.current, contact.current]) {
			if (control) {
				control.value = '';
				control.errorMessage = '';
			}
		}
		if (services.current) {
			services.current.value = [];
			services.current.errorMessage = '';
		}
		dateFields.current = { day: '', month: '', year: '' };
		setDateResetKey((key) => key + 1);
		if (email.current) email.current.value = '';
		setEmailError('');
		setAnnounceEmail(true);
		setResult('Example reset.');
	}

	return (
		<div className="ontario-row">
			<div className="ontario-columns ontario-large-12">
				<h2>Example</h2>
				<p id="error-example-scope">
					Submit the form to see inline errors and an error summary. The summary collects Ontario Design System control
					errors; the native email field uses a standalone error message. No information is sent or stored.
				</p>
				<div className="ontario-form-group">
					<div className="error-alert-example__live-validation">
						<input
							id="live-validation"
							type="checkbox"
							checked={liveValidation}
							onChange={(event) => setLiveValidation(event.target.checked)}
							aria-describedby="live-validation-hint"
						/>
						<label htmlFor="live-validation">Enable live validation</label>
					</div>
					<p id="live-validation-hint">
						When disabled, errors update on submit instead of on blur. Existing errors remain until the next validation.
					</p>
				</div>
				<form
					id="error-example-form"
					noValidate
					aria-describedby="error-example-scope"
					onSubmit={handleSubmit}
					onReset={handleReset}
				>
					<OntarioFormContainer>
						<OntarioInput
							ref={name}
							id="name-control"
							elementId="name-field"
							name="fullName"
							caption="Full name"
							required
							hintText="Enter your first and last name."
							customOnBlur={() => handleBlur(name.current, 'Enter your full name.')}
						/>
						<OntarioTextarea
							ref={details}
							id="details-control"
							elementId="details-field"
							name="details"
							caption="Request details"
							required
							customOnBlur={() => handleBlur(details.current, 'Enter your request details.')}
						/>
						<OntarioDropdownList
							ref={region}
							id="region-control"
							elementId="region-field"
							name="region"
							caption="Region"
							required
							isEmptyStartOption
							options={regionOptions}
							customOnBlur={() => handleBlur(region.current, 'Select a region.')}
						/>
						<OntarioCheckboxes
							ref={services}
							id="services-control"
							name="services"
							caption="Services"
							required
							hintText="Select at least one service."
							options={serviceOptions}
							customOnBlur={() => handleBlur(services.current, 'Select at least one service.')}
						/>
						<OntarioRadioButtons
							ref={contact}
							id="contact-control"
							name="contactMethod"
							caption="Preferred contact method"
							required
							options={contactOptions}
							customOnBlur={() => handleBlur(contact.current, 'Select a preferred contact method.')}
						/>
						<OntarioDateInput
							key={dateResetKey}
							ref={date}
							id="date-control"
							elementId="date-field"
							caption="Requested date"
							required
							hintText="Enter a complete, valid date."
						/>
						<div className="ontario-form-group">
							<label className="ontario-label" htmlFor="native-email">
								Email address (native HTML input)
							</label>
							<p className="ontario-hint" id="native-email-hint">
								For example, name@example.ca.
							</p>
							<OntarioErrorMessage id="native-email-error" message={emailError} announce={announceEmail} />
							<input
								ref={email}
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
						<OntarioButton type="secondary" htmlType="reset">
							Reset
						</OntarioButton>
						<OntarioButton type="primary" htmlType="submit">
							Submit
						</OntarioButton>
					</OntarioFormContainer>
				</form>
				<p role="status">{result}</p>
				<h3>Using a standalone error message</h3>
				<p>
					For a native field, keep the hint and error IDs in <code>aria-describedby</code> and set{' '}
					<code>aria-invalid</code> when the error applies. The application sets and clears the message.
				</p>
				<CodeHighlighter
					codeExample={`<label htmlFor="email">Email address</label>
<p id="email-hint">For example, name@example.ca.</p>
<OntarioErrorMessage id="email-error" message={emailError} />
<input
  id="email"
  type="email"
  aria-invalid={emailError ? 'true' : undefined}
  aria-describedby={emailError ? 'email-hint email-error' : 'email-hint'}
/>`}
				/>
				<hr />
			</div>
		</div>
	);
}
