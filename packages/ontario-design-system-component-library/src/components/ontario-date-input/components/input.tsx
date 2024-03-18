import { FunctionalComponent, h } from '@stencil/core';
import { DateInputFieldType } from '../ontario-date-input-interface';
import { Input as CommonInput } from '../../../utils/common/input/input';

export type InputProps = {
	id: string;
	type: DateInputFieldType;
	label: string;
	accessibilityLabel: string;
	error?: boolean;
	onInput: (value: string, fieldType: DateInputFieldType) => void;
	onChange: (value: string, fieldType: DateInputFieldType) => void;
	onBlur: (fieldType: DateInputFieldType) => void;
	onFocus: (fieldType: DateInputFieldType) => void;
	placeholder?: string;
	required?: boolean;
	ariaDescribedBy?: string;
};

export const Input: FunctionalComponent<InputProps> = ({
	id,
	type,
	label,
	accessibilityLabel,
	placeholder,
	onInput,
	onChange,
	onFocus,
	onBlur,
	ariaDescribedBy,
	error = false,
	required = false,
}) => {
	const handleInputInput = (event: Event) => {
		const newValue = (event.target as HTMLInputElement)?.value ?? '';
		onInput(newValue, type);
	};

	const handleInputChange = (event: Event) => {
		const newValue = (event.target as HTMLInputElement)?.value ?? '';
		onChange(newValue, type);
	};

	const handleInputFocus = () => {
		onFocus(type);
	};

	const handleInputBlur = () => {
		onBlur(type);
	};

	return (
		<div class={`ontario-date__group-input ${error ? 'ontario-date--error' : ''}`}>
			<label htmlFor={id}>
				{label}
				<span class="ontario-show-for-sr">({accessibilityLabel})</span>
			</label>
			<CommonInput
				className="ontario-input ontario-input--4-char-width"
				type="text"
				inputMode="numeric"
				id={id}
				required={!!required}
				placeholder={placeholder}
				onInput={handleInputInput}
				onChange={handleInputChange}
				onFocus={handleInputFocus}
				onBlur={handleInputBlur}
				ariaInvalid={error}
				ariaDescribedBy={ariaDescribedBy}
			/>
		</div>
	);
};
