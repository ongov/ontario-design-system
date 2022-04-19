import { ConsoleMessage } from './console-message.interface';
import { ConsoleType, MessageStyle } from './console-message.enum';

// system tag with formatting specifier
const designSystemTag = '%cOntario Design System';

// default font size for console messages
const fontSize = '12px';

// styles for the system tag in a string format
// the `background-color`, `color`, `padding` and `border-radius` values are hardcoded because
// they are specific for console message use case
const tagStyles = [
	'background-color: #118847',
	'border: none',
	'color: white',
	'padding: 2px 5px',
	'text-align: center',
	'text-decoration: none',
	'display: inline-block',
	'cursor: pointer',
	'border-radius: 5px',
].join(';');

// styles for regular text in string format
const regularTextStyles = ['font-family: sans-serif', `font-size: ${fontSize}`].join(';');

// styles for code in string format
const codedTextStyles = ['font-family: monospace', `font-size: ${fontSize}`].join(';');

// print message to console depending on the `ConsoleType`
export function printConsoleMessage(messageObject: ConsoleMessage[], consoleType = ConsoleType.Warning, hasSystemTag = true) {
	// retrieve message from each object and concatenate them into one single string in order
	// if `hasSystemTag` is true then the message string will being with the value stored within `designSystemTag`.
	const message = messageObject.reduce((message: string, currentObject: ConsoleMessage) => (message += currentObject.message ?? ''), hasSystemTag ? designSystemTag : '');

	// array of arguments to be passed into the the console function
	const messageArray: string[] = [];

	// push message into the array of arguments
	// depending on whether the system tag is used (i.e. `hasSystemTag` is true), push `tagStyles` into the array
	if (hasSystemTag) {
		messageArray.push(message, tagStyles);
	} else {
		messageArray.push(message);
	}

	// push style of each message into the array of arguments in order
	messageObject.forEach((message: ConsoleMessage) => {
		messageArray.push(message.style && message.style === MessageStyle.Code ? codedTextStyles : regularTextStyles);
	});

	// pass array of arguments into the console function for printing depending on `consoleType`
	// the `function.apply()` function handles array of arguments which allows list of arguments to be set programmatically
	switch (consoleType) {
		case ConsoleType.Error:
			console.error.apply(null, messageArray);
			break;
		case ConsoleType.Info:
			console.info.apply(null, messageArray);
			break;
		case ConsoleType.Warning:
			console.warn.apply(null, messageArray);
			break;
		default:
			console.log.apply(null, messageArray);
	}
}
