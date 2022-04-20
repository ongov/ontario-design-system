import { MessageStyle } from './console-message.enum';

export interface ConsoleMessage {
	message: string;
	style: MessageStyle;
}
