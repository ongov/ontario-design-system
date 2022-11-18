# ontario-header

Use the `ontario` type header for all pages that are part of the main ontario.ca website. This header is mandatory.

Use the `applicaton` type header for applications and subsites outside of the main ontario.ca website.

## Usage guidance

Please refer to the [Ontario Design System Ontario.ca header](https://designsystem.ontario.ca/components/detail/ontario-header.html) for current documentation guidance for the Ontario.ca header.

Please refer to the [Ontario Design System Application header](https://designsystem.ontario.ca/components/detail/application-header.html) for current documentation guidance for the Application header.

## Configuration

Once the component package has been installed (see Ontario Design System Component Library for installation instructions), the header component can be added directly into the project's code, and can be customized by updating the properties outlined [here](#properties). Additional information on custom types for header properties are outlined [here](#custom-property-types). Please see the [examples](#examples) below for how to configure the component.

## Examples

Example of an Ontario.ca header component. Note that the `titleHeader` prop is not required for this type of header.

```html
<ontario-header
	type="ontario"
	language-Toggle-Options='{
		"englishLink": "/driving-and-roads",
		"frenchLink" : "/fr/conduite-et-routes"
	}'
	menu-Items='[
		{
			"name": "Arts and Culture",
			"href": "https://www.ontario.ca/page/arts-and-culture",
			"linkIsActive": "false"  
		},
		{
			"name": "Business and economy",
			"href": "https://www.ontario.ca/page/business-and-economy",
			"linkIsActive": "false"  
		},
		{
			"name": "Driving and Roads",
			"href": "https://www.ontario.ca/page/driving-and-roads",
			"linkIsActive": "false"  
		},
		{
			"name": "Education and training",
			"href": "https://www.ontario.ca/page/education-and-training",
			"linkIsActive": "false"  
		},
		{
			"name": "Environment and energy",
			"href": "https://www.ontario.ca/page/environment-and-energy",
			"linkIsActive": "false"  
		},
		{
			"name": "Government",
			"href": "https://www.ontario.ca/page/government",
			"linkIsActive": "false"  
		},
		{
			"name": "Health and wellness",
			"href": "https://www.ontario.ca/page/health-care-ontario",
			"linkIsActive": "false"  
		},
		{
			"name": "Home and community",
			"href": "https://www.ontario.ca/page/home-and-community",
			"linkIsActive": "false"  
		},
		{
			"name": "Jobs and employment",
			"href": "https://www.ontario.ca/page/jobs-and-employment",
			"linkIsActive": "false"  
		},
		{
			"name": "Law and safety",
			"href": "https://www.ontario.ca/page/law-and-safety",
			"linkIsActive": "false"  
		},
		{
			"name": "Rural and north",
			"href": "https://www.ontario.ca/page/rural-and-north",
			"linkIsActive": "false"  
		},
		{
			"name": "Taxes and benefits",
			"href": "https://www.ontario.ca/page/taxes-and-benefits",
			"linkIsActive": "false"  
		},
		{
			"name": "Travel and recreation",
			"href": "https://www.ontario.ca/page/travel-and-recreation",
			"linkIsActive": "false"  
		}
	]'>
</ontario-header>
```

Example of an Application header component.


```html
<ontario-header
  type="application"
	title-Header='{
		"name": "Driving and roads",
		"href": "/driving-and-roads"
	}'
	language-Toggle-Options='{
		"englishLink": "/",
		"frenchLink" : "/fr"
	}'
	menu-Items='[
	{ 
		"name": "Vehicle registration", 
		"href": "/vehicle-registration",
		"linkIsActive": "false" 
	},
	{ 
		"name": "Driver records", 
		"href": "/driver-records",
		"linkIsActive": "false"  
	}, 
	{ 
		"name": "Accessible Parking Permits",
		"href": "/accessible-parking-permits",
		"linkIsActive": "false"  
	},
	{ 
		"name": "Highway traveler information", 
		"href": "/highway-traveler-information",
		"linkIsActive": "true",
		"onClickHandler": (e: Event) => {
				e.preventDefault();
				alert("Menu item clicked!")
		},  
	}
]'>
</ontario-header>
```

## Custom property types

### languageToggleOptions

```html
language-Toggle-Options='{ 
	"englishLink":"/en", 
	"frenchLink": "/fr" 
}'
```

| **Property name** | **Type** | **Description**                   |
| ----------------- | -------- | --------------------------------- |
| `englishLink`       | `string`   | The URL link for the English page |
| `frenchLink`        | `string`   | The URL link for the French page  |

### menuItems

For the Ontario.ca header, the menu items will automatically be rendered in a dropdown menu button.

For Application headers, there is a default of a maximum of 5 menu links on desktop and 2 menu links on tablet displayed in the subheader. This logic is handled by the web component based on the total number of menu links passed.

```html
menu-Items='[
	{ 
		"name": "Vehicle registration", 
		"href": "/vehicle-registration",
		"linkIsActive": "false" 
	},
	{ 
		"name": "Driver records", 
		"href": "/driver-records",
		"linkIsActive": "false"  
	}, 
	{ 
		"name": "Accessible Parking Permits",
		"href": "/accessible-parking-permits",
		"linkIsActive": "false"  
	},
	{ 
		"name": "Highway traveler information", 
		"href": "/highway-traveler-information",
		"linkIsActive": "true",
		"onClickHandler": (e: Event) => {
				e.preventDefault();
				alert("Menu item clicked!")
		},  
	}
]'
```

| **Property name** 	| **Type** 	| **Description**                                                                                                                                     	|
|-------------------	|----------	|-----------------------------------------------------------------------------------------------------------------------------------------------------	|
| `name`              	| `string`   	| The name of the menu item (this is what will appear as the label in the header/dropdown menu)                                                       	|
| `href`              	| `string`   	| The URL for the menu item                                                                                                                           	|
| `linkIsActive`      	| `boolean`  	| A boolean flag for whether or not the current menu item link is active. If set to true, active classes and styles will be applied to the menu item. 	|
| `onClickHandler`    	| Function 	| An optional custom function to add to the menu item. This can be used if any additional logic should happen when the menu item is clicked.          	|

### titleHeader

Note that this is only required for the Application header.

```html
title-header='{
	"name": "Application name",
	"href": "/"
}'
```

| **Property name** 	| **Type** 	| **Description**                                                                                          	|
|-------------------	|----------	|----------------------------------------------------------------------------------------------------------	|
| `name`              	| `string`   	| The name of the application (this is what will appear as the label for the application sub header title) 	|
| `href`              	| `string`   	| The URL for the application name                                                                         	|

## Accessibility

### Application header

To ensure best practices, it is important to limit the number of navigation links passed to the `menuItems` property. We recommend a maximum of seven links, and to keep the labels for these links concise.

<!-- Auto Generated Below -->

## Properties

| Property                | Attribute                 | Description                            | Type                                      | Default         |
| ----------------------- | ------------------------- | -------------------------------------- | ----------------------------------------- | --------------- |
| `languageToggleOptions` | `language-toggle-options` | The link that contains the french page | `languageToggleOptions \| string`         | `undefined`     |
| `menuItems`             | `menu-items`              | The items that will go inside the menu | `headerTitle[] \| string`                 | `undefined`     |
| `titleHeader`           | `title-header`            | The title for the header               | `headerTitle \| string`                   | `undefined`     |
| `type`                  | `type`                    | The type of header                     | `"application" \| "ontario" \| undefined` | `'application'` |

---

_Built with [StencilJS](https://stenciljs.com/)_
