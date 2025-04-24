import { OntarioFormContainer, OntarioFieldset, OntarioInput, OntarioDropdownList, OntarioTextarea, OntarioButton } from '@ongov/ontario-design-system-component-library-react';

# ontario-form-container

The `ontario-form-container` component defines vertical spacing (referred to as _gap_) between child form elements within a container. It ensures consistent and accessible spacing between form elements, aligning with design tokens from the Ontario Design System.

## Usage Guidance

### When to use this component

Use the `ontario-form-container` component when:

- You need to apply consistent vertical spacing between form elements
- A clear visual hierarchy is required within a form
- Different elements require varying spacing levels (`default` or `condensed`)

### When not to use this component

Avoid using this component if:

- You need horizontal spacing between elements
- The spacing is purely decorative

## Technical Specifications

The component uses a single default slot to render child elements. It is designed to be used with the following form components: `ontario-fieldset`, `ontario-input`, `ontario-textarea`, `ontario-checkboxes`, `ontario-dropdown-list`, `ontario-radio-buttons`, `ontario-date-input` and `ontario-button`.

By default, the above components do not have built-in margins to separate them from one another. The ontario form container component should be used for maintaining readability and creating visual hierarchy.

**Spacing options:**

- **Default** (40px) corresponds to $spacing-7.
- **Condensed** (16px) corresponds to $spacing-4.

**Styling:**

- Applies `margin-bottom` values to all child elements except the last one
- Supports nested usage, allowing smaller spacing within larger spacing containers. Nested spacing should be used when elements are closely linked and require reduced spacing

## Examples

### Default gap example

No `gap` prop is required when using the default gap option.

```html
<form>
	<ontario-form-container>
		<ontario-fieldset legend-size="large" legend="What is your delivery address?">
			<ontario-input
				id="delivery-address-form-line-1"
				caption="Address line 1"
				required
				name="delivery-address-form-line-1"
				hint-text="Street and number or P.O. box."
				enable-live-validation
				required-validation-message="Please enter your address"
			></ontario-input>
			<ontario-input
				caption="Address line 2"
				name="delivery-address-form-line-2"
				hint-text="Apartment, suite, unit, building, etc."
			></ontario-input>
			<ontario-dropdown-list
				caption="Province/territory"
				name="delivery-address-form-province-selection-form"
				element-id="delivery-address-form-province-territory"
				required
				is-empty-start-option="true"
				options='[
					{ "value": "ON", "label": "Ontario" },
					{ "value": "QC", "label": "Quebec" },
					{ "value": "SK", "label": "Saskatchewan" }
				]'
			></ontario-dropdown-list>
		</ontario-fieldset>
	</ontario-form-container>
</form>
```

<form>
	<OntarioFormContainer>
		<OntarioFieldset legendSize="large" legend="What is your delivery address?">
			<OntarioInput
				id="delivery-address-form-line-1"
				caption="Address line 1"
				required
				name="delivery-address-form-line-1"
				hintText="Street and number or P.O. box."
				enableLiveValidation
				requiredValidationMessage="Please enter your address"
			>
			</OntarioInput
				caption="Address line 2"
				name="delivery-address-form-line-2"
				hintText="Apartment, suite, unit, building, etc."
			>
			</OntarioInput>
			<OntarioDropdownList
				caption="Province/territory"
				name="delivery-address-form-province-selection-form"
				elementId="delivery-address-form-province-territory"
				required
				isEmptyStartOption="true"
				options='{[
					{ "value": "ON", "label": "Ontario" },
					{ "value": "QC", "label": "Quebec" },
					{ "value": "SK", "label": "Saskatchewan" }
				]}'
			>
			</OntarioDropdownList>
		</OntarioFieldset>
	</OntarioFormContainer>
</form>

### Mixed gap example

This example uses both default and condensed gaps.

```html
<form>
	<ontario-form-container>
		<ontario-fieldset legend-size="large" legend="What is your delivery address?">
			<ontario-input
				name="email"
				input-width="20-char-width"
				caption='{
                    "captionText": "Email",
                    "captionType": "large"
                }'
				required="true"
			></ontario-input>
			<ontario-form-container gap="condensed">
				<ontario-textarea
					name="comments"
					caption='{
                        "captionText": "Comments",
                        "captionType": "large"
                    }'
					required="true"
				></ontario-textarea>
				<ontario-button type="secondary">✅ Share my feedback</ontario-button>
			</ontario-form-container>
		</ontario-fieldset>
	</ontario-form-container>
</form>
```

<form>
	<OntarioFormContainer>
		<OntarioFieldset legendSize="large" legend="What is your delivery address?">
			<OntarioInput
				name="email"
				inputWidth="20-char-width"
				caption='{
                    "captionText": "Email",
                    "captionType": "large"
                }'
				required="true"
			></OntarioInput>
			<OntarioFormContainer gap="condensed">
				<OntarioTextarea
					name="comments"
					caption='{
                        "captionText": "Comments",
                        "captionType": "large"
                    }'
					required="true"
				></OntarioTextarea>
				<OntarioButton type="secondary">✅ Share my feedback</OntarioButton>
			</OntarioFormContainer>
		</OntarioFieldset>
	</OntarioFormContainer>
</form>

## Best Practices

- Use the **default gap** spacing for standard forms
- Use the **condensed gap** spacing when form elements are closely related but of different types
- Limit the number of nested spacing levels to avoid complex and unreadable layouts

## Accessibility considerations

- **Readability and Usability**: Ensure that spacing choices support clear and structured layouts
- **Focus Order**: Spacing should not disrupt the expected focus order when navigating with a keyboard or screen reader
- **Visual Hierarchy**: Appropriate spacing improves visual hierarchy, reducing cognitive load
- **Semantic Markup**: When using condensed spacing sections, consider using semantic elements to group items together, such as the `<ontario-fieldset>`

## Configuration

Once the component package has been installed (see the Ontario Design System Component Library for installation instructions), the `ontario-form-container` component can be added directly into the project's code and customized using the `gap` property.

<!-- Auto Generated Below -->

## Properties

| Property | Attribute | Description                                                                                                              | Type                       | Default     |
| -------- | --------- | ------------------------------------------------------------------------------------------------------------------------ | -------------------------- | ----------- |
| `gap`    | `gap`     | Defines the gap (bottom margin) between slotted form elements. If no gap prop is provided, it will default to 'default'. | `"condensed" \| "default"` | `'default'` |

---

_Built with [StencilJS](https://stenciljs.com/)_
