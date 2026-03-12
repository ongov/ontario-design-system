import { Grid } from '../../grid';
import {
	OntarioFormContainer,
	OntarioInput,
	OntarioTextarea,
	OntarioDropdownList,
} from '@ongov/ontario-design-system-component-library-react';

export default function OntarioFormContainerPage() {
	return (
		<main>
			<Grid>
				<h1>ontario-form-container</h1>

				<h2>"gap" Prop Variants</h2>

				<h3>Default gap</h3>
				<OntarioFormContainer id="ontario-form-container-default-gap" gap="default">
					<OntarioInput
						name="default-gap-input-1"
						caption={{ captionText: 'First name', captionType: 'default' }}
					></OntarioInput>
					<OntarioInput
						name="default-gap-input-2"
						caption={{ captionText: 'Last name', captionType: 'default' }}
					></OntarioInput>
					<OntarioTextarea
						name="default-gap-textarea"
						caption={{ captionText: 'Additional details', captionType: 'default' }}
					></OntarioTextarea>
				</OntarioFormContainer>

				<h3 className="ontario-margin-top-64-!">Condensed gap</h3>
				<OntarioFormContainer id="ontario-form-container-condensed-gap" gap="condensed">
					<OntarioInput
						name="condensed-gap-input-1"
						caption={{ captionText: 'Street address', captionType: 'default' }}
					></OntarioInput>
					<OntarioInput
						name="condensed-gap-input-2"
						caption={{ captionText: 'City', captionType: 'default' }}
					></OntarioInput>
					<OntarioDropdownList
						name="condensed-gap-dropdown"
						caption={{ captionText: 'Province', captionType: 'default' }}
						options={[
							{ label: 'Ontario', value: 'ON' },
							{ label: 'Quebec', value: 'QC' },
							{ label: 'Manitoba', value: 'MB' },
						]}
					></OntarioDropdownList>
				</OntarioFormContainer>

				<hr />

				<h2>ontario-form-container Edge Cases</h2>

				<h3>No gap prop (should default to default spacing)</h3>
				<OntarioFormContainer id="ontario-form-container-no-gap-prop">
					<OntarioInput
						name="no-gap-prop-input-1"
						caption={{ captionText: 'Email address', captionType: 'default' }}
					></OntarioInput>
					<OntarioInput
						name="no-gap-prop-input-2"
						caption={{ captionText: 'Phone number', captionType: 'default' }}
					></OntarioInput>
				</OntarioFormContainer>

				<h3 className="ontario-margin-top-64-!">Invalid gap value (should fall back to default spacing)</h3>
				<OntarioFormContainer
					id="ontario-form-container-invalid-gap"
					gap={'banana' as unknown as React.ComponentProps<typeof OntarioFormContainer>['gap']}
				>
					<OntarioInput
						name="invalid-gap-input-1"
						caption={{ captionText: 'Postal code', captionType: 'default' }}
					></OntarioInput>
					<OntarioInput
						name="invalid-gap-input-2"
						caption={{ captionText: 'Country', captionType: 'default' }}
					></OntarioInput>
				</OntarioFormContainer>

				<h3 className="ontario-margin-top-64-!">Single slotted child</h3>
				<OntarioFormContainer id="ontario-form-container-single-child" gap="condensed">
					<OntarioInput
						name="single-child-input"
						caption={{ captionText: 'Single field example', captionType: 'default' }}
					></OntarioInput>
				</OntarioFormContainer>
			</Grid>
		</main>
	);
}
