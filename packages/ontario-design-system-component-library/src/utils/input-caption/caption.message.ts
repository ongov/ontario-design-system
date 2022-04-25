import { ConsoleMessage } from '../console-message/console-message.interface';
import { MessageStyle } from '../console-message/console-message.enum';
import { MessageContentType } from './input-caption.enum';

/**
 * Generate the content of warning message to be printed to the console
 * @param messageType determine the content of warning message to output
 * @param componentTagName the tag name of the component that's emitting the warning message
 * @param requiredFlagText accepts a string value to be used as the required flag text and defaults to `(optional)` if not set
 * @returns an array of `ConsoleMessage` objects containing the message and associated styles to be printed to the console
 */
export const getWarningMessage = (messageType: MessageContentType, componentTagName: string, requiredFlagText: string = '(optional)'): ConsoleMessage[] => {
	let message: ConsoleMessage[] = [
		{
			message: ' caption ',
			style: MessageStyle.Code,
		},
		{
			message: 'object on',
			style: MessageStyle.Regular,
		},
		{
			message: ` <${componentTagName}> `,
			style: MessageStyle.Code,
		},
	];

    if (messageType !== MessageContentType.UndefinedCaptionObject) {
        const problematicProperty: ConsoleMessage[] = [
            {
                message: ` ${messageType === MessageContentType.EmptyCaptionText || messageType === MessageContentType.UndefinedCaptionText ? 'captionText' : 'captionType'} `,
                style: MessageStyle.Code,
            },
            {
                message: 'property of',
                style: MessageStyle.Regular,
            }
        ];
        message = [...problematicProperty, ...message];
    }

	switch (messageType) {
        // undefinedCaptionObject example: caption object on <ontario-input> is required but not defined. A blank followed by a (optional) flag is assumed.
        // undefinedCaptionText example: captionText property of caption object on <ontario-input> is required but not defined. A blank followed by a (optional) flag is assumed.
        // EmptyCaptionText example: captionText property of caption object on <ontario-input> is empty or contains only spaces. A blank followed by a (optional) flag is assumed.
		case MessageContentType.UndefinedCaptionObject:
        case MessageContentType.UndefinedCaptionText:
        case MessageContentType.EmptyCaptionText:
			let undefinedMessage: ConsoleMessage[] = [
				{
					message: `${messageType === MessageContentType.EmptyCaptionText ? 'is empty or contains only spaces' : 'is required but not defined'}. A blank followed by a`,
					style: MessageStyle.Regular,
				},
				{
					message: ` ${requiredFlagText} `,
					style: MessageStyle.Code,
				},
				{
					message: 'flag is assumed.',
					style: MessageStyle.Regular,
				},
			];
			message = [...message, ...undefinedMessage];
			break;

        // UndefinedCaptionType example: captionType property of caption object on <ontario-input> is not defined. The default type is assumed.
		case MessageContentType.UndefinedCaptionType:
			let undefinedTypeMessage: ConsoleMessage[] = [
				{
					message: 'is not defined. The',
					style: MessageStyle.Regular,
				},
				{
					message: ` default `,
					style: MessageStyle.Code,
				},
				{
					message: 'type is assumed.',
					style: MessageStyle.Regular,
				},
			];
			message = [...message, ...undefinedTypeMessage];
			break;

        // IncorrectCaptionType example: captionType property of caption object on <ontario-input> was set to an incorrect type; only default, heading or large type is allowed. The default type is assumed.
		case MessageContentType.IncorrectCaptionType:
			let incorrectTypeMessage: ConsoleMessage[] = [
				{
					message: `was set to an incorrect type; only`,
					style: MessageStyle.Regular,
				},
				{
					message: ' default, heading, ',
					style: MessageStyle.Code,
				},
				{
					message: 'or',
					style: MessageStyle.Regular,
				},
				{
					message: ' large ',
					style: MessageStyle.Code,
				},
				{
					message: 'type is allowed. The',
					style: MessageStyle.Regular,
				},
				{
					message: ' default ',
					style: MessageStyle.Code,
				},
				{
					message: 'type is assumed.',
					style: MessageStyle.Regular,
				},
			];
			message = [...message, ...incorrectTypeMessage];
			break;
	}

	return message;
};
