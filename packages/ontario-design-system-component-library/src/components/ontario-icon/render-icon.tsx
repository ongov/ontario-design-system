import { Build, FunctionalComponent, h, JSX } from '@stencil/core';

export interface IconSvgAccessibility {
	role?: 'img';
	ariaLabel?: string;
	ariaHidden?: 'true';
	focusable: 'false';
}

export interface RenderIconProps {
	iconWidth: number;
	colourClass?: string;
	label?: string;
	renderSvg: (accessibility: IconSvgAccessibility) => JSX.Element;
}

export const RenderIcon: FunctionalComponent<RenderIconProps> = ({ iconWidth, colourClass, label, renderSvg }) => {
	const accessibleName = label?.trim();
	const isMeaningful = Boolean(accessibleName);
	const iconClasses = ['ontario-icon', colourClass, `ontario-icon--width-${iconWidth}`].filter(Boolean).join(' ');

	return (
		<div class={iconClasses} style={{ width: `${iconWidth}px` }}>
			{renderSvg({
				role: isMeaningful ? 'img' : undefined,
				ariaLabel: isMeaningful ? accessibleName : undefined,
				ariaHidden: isMeaningful ? undefined : 'true',
				focusable: 'false',
			})}
		</div>
	);
};

export const warnIsDecorativeDeprecated = () => {
	if (Build.isDev) {
		console.warn(
			'The isDecorative prop on ontario-icon components is deprecated. Use label to provide an accessible name.',
		);
	}
};
