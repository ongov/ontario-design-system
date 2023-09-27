import { FunctionalComponent, h } from '@stencil/core';
import { isEmpty } from '../../../utils/helper/utils';

export type ErrorMessageProps = {
	error?: boolean;
	message?: string;
};

export const ErrorMessage: FunctionalComponent<ErrorMessageProps> = ({ message, error = false }) => {
	const hideError = !error || isEmpty(message);

	return (
		<div role="alert" class={`ontario-error-messaging ${hideError ? 'ontario-error__hidden' : ''}`}>
			<ontario-icon-alert-error></ontario-icon-alert-error>
			<div class="ontario-error-messaging__content">{message}</div>
		</div>
	);
};
