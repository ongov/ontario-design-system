import { FunctionalComponent, h } from '@stencil/core';

export type InputProps = {
	inputAutoComplete?: string;
	inputClass: string;
	inputId: string;
	inputName?: string;
	inputType: string;
	inputValue?: string | number;
	isRequired?: boolean;
	inputOnKeyDown?: ((event: Event) => void) | undefined;
	inputOnInput?: ((event: Event) => void) | undefined;
	inputOnChange?: ((event: Event) => void) | undefined;
	inputOnBlur?: ((event: Event) => void) | undefined;
	inputOnFocus?: ((event: Event) => void) | undefined;
	inputRef?: (el: any) => HTMLElement;
};

export const Input: FunctionalComponent<InputProps> = (props) => {
	const {
		inputAutoComplete,
		inputClass,
		inputId,
		inputName,
		inputType,
		inputValue,
		isRequired,
		inputOnKeyDown,
		inputOnInput,
		inputOnChange,
		inputOnBlur,
		inputOnFocus,
		inputRef,
	} = props;

	return (
		<input
			autoComplete={inputAutoComplete}
			class={inputClass}
			id={inputId}
			name={inputName}
			type={inputType}
			value={inputValue}
			required={isRequired}
			onKeyDown={inputOnKeyDown}
			onInput={inputOnInput}
			onChange={inputOnChange}
			onBlur={inputOnBlur}
			onFocus={inputOnFocus}
			ref={inputRef}
		/>
	);
};
