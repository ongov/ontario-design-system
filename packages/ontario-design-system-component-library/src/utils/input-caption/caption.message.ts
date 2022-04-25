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
	const problematicProperty = messageType === MessageContentType.UndefinedCaptionType || messageType === MessageContentType.IncorrectCaptionType ? ' captionType ' : ' caption ';

	let message: ConsoleMessage[] = [
		{
			message: `${problematicProperty}`,
			style: MessageStyle.Code,
		},
		{
			message: `${messageType === MessageContentType.UndefinedCaptionObject ? 'object ' : ''}on`,
			style: MessageStyle.Regular,
		},
		{
			message: ` <${componentTagName}> `,
			style: MessageStyle.Code,
		},
	];

	switch (messageType) {
		case MessageContentType.UndefinedCaptionObject:
		case MessageContentType.UndefinedCaption:
			let undefinedMessage: ConsoleMessage[] = [
				{
					message: 'is required but not defined. A blank followed by the',
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

		case MessageContentType.EmptyCaption:
			let emptyCaptionMessage: ConsoleMessage[] = [
				{
					message: 'is empty. A blank followed by the',
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
			message = [...message, ...emptyCaptionMessage];
			break;

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
