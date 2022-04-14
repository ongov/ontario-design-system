import { ConsoleMessage } from './console-message.interface';
import { ConsoleType, MessageStyle } from './console-message.enum';

// system tag with formatting specifier
const designSystemTag = '%cOntario Design System';
const fontSize = '12px';

// styles for the system tag in a string format
const tagStyle = [
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
const regularText = ['font-family: sans-serif', `font-size: ${fontSize}`].join(';');

// styles for code in string format
const codedText = ['font-family: monospace', `font-size: ${fontSize}`].join(';');

// print message to console depending on the type of console
export function printConsoleMessage(messageObject: ConsoleMessage[], consoleType = ConsoleType.WARNING, hasTag = true) {
    
    // retrieve message from each object and concatenate them into one single string in order
    const message = messageObject.reduce((message: string, currentObject: ConsoleMessage) => (message += currentObject.message ?? ''), hasTag ? designSystemTag : '');
    
    // array of arguments to be passed into the the console function
    const messageArray: string[] = [];
    
    // push message into the array of arguments depending on whether `hasTag` is true
    if (hasTag) {
        messageArray.push(message, tagStyle);
    } else {
        messageArray.push(message);
    }

    // push style of reach message into the array of arguments in order
    messageObject.forEach((message: ConsoleMessage) => {
        messageArray.push(message.style && message.style === MessageStyle.CODE ? codedText : regularText);
    });

    // pass array of arguments into the console function depending on `consoleType`
	switch (consoleType) {
		case ConsoleType.ERROR:
			console.error.apply(null, messageArray);
			break;
		case ConsoleType.INFO:
			console.info.apply(null, messageArray);
			break;
		case ConsoleType.WARNING:
            console.warn.apply(null, messageArray);
            break;
		default:
            console.log.apply(null, messageArray);
	}
}
