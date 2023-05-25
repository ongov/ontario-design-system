import { FunctionalComponent, h } from '@stencil/core';

export type InputProps = {
	autoComplete?: string;
	className?: string;
	id: string;
	name?: string;
	type: string;
	value?: string | number;
	required?: boolean;
	onKeyDown?: ((event: Event) => void) | undefined;
	onInput?: ((event: Event) => void) | undefined;
	onChange?: ((event: Event) => void) | undefined;
	onBlur?: ((event: Event) => void) | undefined;
	onFocus?: ((event: Event) => void) | undefined;
	ref?: (el: any) => HTMLElement;
};

export const Input: FunctionalComponent<InputProps> = ({
	autoComplete,
	className,
	id,
	name,
	type,
	value,
	required,
	onKeyDown,
	onInput,
	onChange,
	onBlur,
	onFocus,
	ref,
	...props
}) => {
	return (
		<input
			autoComplete={autoComplete}
			class={className}
			id={id}
			name={name}
			type={type}
			value={value}
			required={!!required}
			onKeyDown={onKeyDown}
			onInput={onInput}
			onChange={onChange}
			onBlur={onBlur}
			onFocus={onFocus}
			ref={ref}
			{...props}
		/>
	);
};
