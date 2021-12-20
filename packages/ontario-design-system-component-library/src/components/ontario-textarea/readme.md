# ontario-textarea

The ontario-textarea is a multiline version of a text input. It is often used in forms for longer-form responses, feedback or comments.

It should be used when you want the user to enter more than a single line of information.

<br>

## User Interaction Behaviour

User enters text into the textarea component.

<br>

## API Specifications

| Property   	| Required? 	| Type     	| Description                                                                                                	| Default   	|
|------------	|-----------	|----------	|------------------------------------------------------------------------------------------------------------	|-----------	|
| `textareaId` 	| optional  	| `string`   	| The ID assigned to the textarea.                                                                           	|           	|
| `name`       	| required  	| `string`   	| The name assigned to the textarea.The name value is used to reference form data after a form is submitted. 	|           	|
| `required`   	| optional  	| `boolean`  	| Used to define whether the textarea field is required or not.                                              	| false     	|
| `value`      	| optional  	| `string`   	| The textarea content value.                                                                                	|           	|
| `onBlur`     	| optional  	| `Function` 	| The custom action assigned when the textarea loses focus.                                                  	| undefined 	|
| `onChange`   	| optional  	| `Function` 	| The custom action when the textarea value changes.                                                         	| undefined 	|

<br>

## Events
### Emitted Events

* `onBlur`:  Triggered once user focuses out of textarea component
* `onChange`: Triggered once user changes the value of the textarea component

<br>

## Examples

```
<ontario-textarea name="comments" id="form-comments"/>
```

```
<ontario-textarea name="comments" id="form-comments" required="true" onBlur="exampleFunction()"/>
```


<br>

## Accessibility Considerations
* An `id` attribute is necessary to allow the textarea to be associated with a label element
* A `name` attribute needs to be set to be submitted to the server when the form is submitted.

<br>

## Further documentation

See the [Design System textarea guidance](https://designsystem.ontario.ca/components/detail/text-areas.html) for current documentation guidelines.
