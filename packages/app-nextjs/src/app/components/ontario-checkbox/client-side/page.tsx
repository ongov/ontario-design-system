'use client';

import { useState } from 'react';
import { Grid } from '../../../grid';
import { OntarioCheckbox } from '@ongov/ontario-design-system-component-library-react';

type CustomEventRecord = { count: number; value: string };

const initialEventRecord: CustomEventRecord = { count: 0, value: '' };

export default function OntarioCheckboxPage() {
	const [changeEvent, setChangeEvent] = useState(initialEventRecord);
	const [focusEvent, setFocusEvent] = useState(initialEventRecord);
	const [blurEvent, setBlurEvent] = useState(initialEventRecord);

	const recordEvent = (value: string) => (record: CustomEventRecord) => ({ count: record.count + 1, value });

	return (
		<main>
			<Grid>
				<h1>ontario-checkbox (Client Side)</h1>

				<div>
					<h2>Custom Event Props</h2>

					<OntarioCheckbox
						id="ontario-checkbox-custom-events"
						label="I have read and agree to the Terms and Conditions"
						name="checkbox-default"
						value="agreed"
						customOnChange={(e) => {
							const checked = `${(e.target as HTMLInputElement)?.checked}`;
							console.log(`customOnChange → ${checked}`);
							setChangeEvent(recordEvent(checked));
						}}
						customOnFocus={(e) => {
							const value = `${(e.target as HTMLInputElement)?.value}`;
							console.log(`customOnFocus → ${value}`);
							setFocusEvent(recordEvent(value));
						}}
						customOnBlur={() => {
							console.log(`customOnBlur`);
							setBlurEvent(recordEvent(''));
						}}
					></OntarioCheckbox>

					{/* Rendered so the e2e tests can assert on the handlers without depending on console output. */}
					<ul>
						<li id="ontario-checkbox-custom-on-change" data-count={changeEvent.count} data-value={changeEvent.value}>
							customOnChange: {changeEvent.count}
						</li>
						<li id="ontario-checkbox-custom-on-focus" data-count={focusEvent.count} data-value={focusEvent.value}>
							customOnFocus: {focusEvent.count}
						</li>
						<li id="ontario-checkbox-custom-on-blur" data-count={blurEvent.count}>
							customOnBlur: {blurEvent.count}
						</li>
					</ul>
				</div>
			</Grid>
		</main>
	);
}
