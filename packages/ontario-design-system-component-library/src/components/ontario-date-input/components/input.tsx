import { FunctionalComponent, h } from '@stencil/core';
import { DateInputFieldType } from '../ontario-date-input-interface';
import { Input as CommonInput } from '../../../utils/common/input/input';

export type InputProps = {
	id: DateInputFieldType;
	label: string;
	accessibilityLabel: string;
	error?: boolean;
	onInput: (value: string, fieldType: DateInputFieldType) => void;
	onBlur: (fieldType: DateInputFieldType) => void;
	onFocus: (fieldType: DateInputFieldType) => void;
	placeholder?: string;
	required?: boolean;
};

export const Input: FunctionalComponent<InputProps> = ({
	id,
	label,
	accessibilityLabel,
	placeholder,
	onInput,
	onFocus,
	onBlur,
	error = false,
	required = false,
}) => {
	const handleInputChange = (event: Event) => {
		const newValue = (event.target as HTMLInputElement)?.value ?? '';
		onInput(newValue, id);
	};

	const handleInputFocus = () => {
		onFocus(id);
	};

	const handleInputBlur = () => {
		onBlur(id);
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
				onInput={handleInputChange}
				onFocus={handleInputFocus}
				onBlur={handleInputBlur}
			/>
		</div>
	);
};
