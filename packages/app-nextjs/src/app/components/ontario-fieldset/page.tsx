import { Grid } from '../../grid';
import {
	OntarioFieldset,
	OntarioInput,
	OntarioDropdownList,
	OntarioTextarea,
} from '@ongov/ontario-design-system-component-library-react';

export default function OntarioCriticalAlertPage() {
	return (
		<main>
			<Grid>
				<h1>ontario-fieldset</h1>

				<h2>'legendSize' Prop Variants</h2>

				<h3>heading</h3>
				<OntarioFieldset legend="What is your delivery address?" legendSize="heading">
					<OntarioInput
						id="address-line-1"
						caption="Address line 1"
						required
						name="address-line-1"
						hint-text="Street and number or P.O. box."
					></OntarioInput>
					<OntarioInput
						caption="Address line 2"
						name="address-line-2"
						hint-text="Apartment, suite, unit, building, etc."
					></OntarioInput>
					<OntarioInput
						id="post-code"
						caption="Postal code"
						required
						name="postal-code"
						input-width="7-char-width"
					></OntarioInput>
				</OntarioFieldset>

				<h3>large</h3>
				<OntarioFieldset legend="What is your delivery address?" legendSize="large">
					<OntarioInput
						id="address-line-3"
						caption="Address line 1"
						required
						name="address-line-3"
						hint-text="Street and number or P.O. box."
					></OntarioInput>
					<OntarioDropdownList
						caption="Province/territory"
						name="province-selection"
						element-id="province-territory"
						required
						is-empty-start-option="true"
						options={[
							{
								value: 'AB',
								label: 'Alberta',
							},
							{
								value: 'BC',
								label: 'British Columbia',
							},
							{
								value: 'MB',
								label: 'Manitoba',
							},
							{
								value: 'NB',
								label: 'New Brunswick',
							},
							{
								value: 'NL',
								label: 'Newfoundland and Labrador',
							},
							{
								value: 'NS',
								label: 'Nova Scotia',
							},
							{
								value: 'ON',
								label: 'Ontario',
							},
							{
								value: 'QC',
								label: 'Quebec',
							},
							{
								value: 'SK',
								label: 'Saskatchewan',
							},
							{
								value: 'NT',
								label: 'Northwest Territories',
							},
							{
								value: 'NU',
								label: 'Nunavut',
							},
							{
								value: 'YT',
								label: 'Yukon',
							},
						]}
					></OntarioDropdownList>
					<OntarioInput
						id="post-code-2"
						caption="Postal code"
						required
						name="postal-code-2"
						input-width="7-char-width"
					></OntarioInput>
				</OntarioFieldset>

				<h3>default</h3>
				<OntarioFieldset legend="What is your contact information?">
					<OntarioInput id="name" caption="Name" name="name"></OntarioInput>
					<OntarioInput id="email" caption="Email" name="email" type="email"></OntarioInput>
					<OntarioInput id="subject" caption="Subject" name="subject"></OntarioInput>
					<OntarioTextarea id="message" caption="Message" name="message"></OntarioTextarea>
				</OntarioFieldset>
			</Grid>
		</main>
	);
}
