import { h } from '@stencil/core';

export function getLabelElement(type: string, htmlFor: string, required: boolean, caption?: string): any {
	const typeText = type.toLowerCase();
	const labelContent = (
		<label htmlFor={htmlFor} class={getClass(typeText)}>
			{caption}
			<span class="ontario-label__flag">{getRequiredFlagText(required)}</span>
		</label>
	);
	return typeText === 'heading' ? <h1>{labelContent}</h1> : labelContent;
}

function getRequiredFlagText(required: boolean): string {
	return required ? '(required)' : '(optional)';
}

function getClass(type: string): string {
	const typeLowerCase = type.toLowerCase();
	return typeLowerCase === 'default' ? `ontario-label` : `ontario-label ontario-label--${typeLowerCase}`;
}
