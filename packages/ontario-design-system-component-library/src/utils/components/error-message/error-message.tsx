import { FunctionalComponent, h } from '@stencil/core';
import { isEmpty } from '../../../utils/helper/utils';

export type ErrorMessageProps = {
	error?: boolean;
	id?: string;
	message?: string;
	announce?: boolean;
	renderEmpty?: boolean;
};

/**
 * @deprecated Use `ontario-error-message` instead. Associate the native field with the component's host ID.
 * Retained for hybrid applications that import the functional renderer directly.
 */
export const ErrorMessage: FunctionalComponent<ErrorMessageProps> = ({
	message,
	error = false,
	id,
	announce = true,
	renderEmpty = true,
}) => {
	const hideError = !error || isEmpty(message);
	if (hideError && !renderEmpty) return null;

	return (
		<div
			id={id}
			role={announce ? 'alert' : undefined}
			class={`ontario-error-messaging ${hideError ? 'ontario-error__hidden' : ''}`}
		>
			<ontario-icon-alert-error aria-hidden={hideError ? undefined : 'true'}></ontario-icon-alert-error>
			<div class="ontario-error-messaging__content">{message}</div>
		</div>
	);
};
