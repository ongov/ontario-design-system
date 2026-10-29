import { FunctionalComponent, h } from '@stencil/core';

export type InputProps = {
	autoComplete?: string;
	className?: string;
	id: string;
	name?: string;
	type: string;
	role?: string;
	value?: string | number;
	checked?: boolean;
	required?: boolean;
	inputMode?: string;
	pattern?: string;
	placeholder?: string;
	ariaLabel?: string;
	ariaInvalid?: boolean;
	ariaControls?: string;
	ariaHaspopup?: string;
	ariaExpanded?: boolean;
	ariaAutocomplete?: string;
	ariaActivedescendant?: string;
	ariaDescribedBy?: string;
	onKeyDown?: ((event: Event) => void) | undefined;
	onInput?: ((event: Event) => void) | undefined;
	onChange?: ((event: Event) => void) | undefined;
	onBlur?: ((event: Event) => void) | undefined;
	onFocus?: ((event: Event) => void) | undefined;
	onClick?: ((event: Event) => void) | undefined;
	ref?: (el: HTMLInputElement) => HTMLElement;
};

export const Input: FunctionalComponent<InputProps> = ({
	autoComplete,
	className,
	id,
	name,
	placeholder,
	type,
	role,
	value,
	checked,
	required,
	onKeyDown,
	onInput,
	onChange,
	onBlur,
	onFocus,
	onClick,
	ariaLabel,
	ariaInvalid,
	ariaControls,
	ariaHaspopup,
	ariaExpanded,
	ariaAutocomplete,
	ariaActivedescendant,
	ariaDescribedBy,
	ref,
	inputMode,
	pattern,
	...props
}) => {
	return (
		<input
			autoComplete={autoComplete}
			class={className}
			id={id}
			name={name}
			type={type}
			role={role}
			value={value}
			checked={checked}
			placeholder={placeholder}
			required={!!required}
			onKeyDown={onKeyDown}
			onInput={onInput}
			onChange={onChange}
			onBlur={onBlur}
			onFocus={onFocus}
			onClick={onClick}
			inputMode={inputMode}
			pattern={pattern}
			ref={ref}
			aria-label={ariaLabel}
			aria-invalid={ariaInvalid}
			aria-controls={ariaControls}
			aria-haspopup={ariaHaspopup}
			aria-expanded={ariaExpanded}
			aria-autocomplete={ariaAutocomplete}
			aria-activedescendant={ariaActivedescendant}
			aria-describedby={ariaDescribedBy}
			{...props}
		/>
	);
};
