import { FunctionalComponent, h } from '@stencil/core';

export type InputProps = {
	autoComplete?: string;
	className?: string;
	id: string;
	name?: string;
	type: string;
	value?: string | number;
	checked?: boolean;
	required?: boolean;
	inputMode?: string;
	placeholder?: string;
	ariaInvalid?: boolean;
	ariaDescribedBy?: string;
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
	placeholder,
	type,
	value,
	checked,
	required,
	onKeyDown,
	onInput,
	onChange,
	onBlur,
	onFocus,
	ariaInvalid,
	ariaDescribedBy,
	ref,
	inputMode,
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
			checked={checked}
			placeholder={placeholder}
			required={!!required}
			onKeyDown={onKeyDown}
			onInput={onInput}
			onChange={onChange}
			onBlur={onBlur}
			onFocus={onFocus}
			inputMode={inputMode}
			ref={ref}
			aria-invalid={ariaInvalid}
			aria-describedby={ariaDescribedBy}
			{...props}
		/>
	);
};
