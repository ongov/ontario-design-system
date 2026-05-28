import React from 'react';

import { OntarioInput as GeneratedOntarioInput } from '../components/components.js';
import { setRef } from '../react-component-lib/utils/index.js';

type OntarioInputHostElement = HTMLElement & {
	getInputElement?: () => Promise<HTMLInputElement | null>;
	componentOnReady?: () => Promise<unknown>;
};

const mapHostRefToNativeInput = (hostElement: HTMLElement | null, ref: React.ForwardedRef<unknown>) => {
	if (!ref) {
		return;
	}

	if (!hostElement) {
		setRef(ref, null);
		return;
	}

	const hostWithInputMethod = hostElement as OntarioInputHostElement;

	const assignInputRef = async () => {
		const inputElement = await hostWithInputMethod.getInputElement?.();
		setRef(ref, inputElement ?? null);
	};

	assignInputRef().catch((_error: unknown): void => undefined);

	hostWithInputMethod
		.componentOnReady?.()
		.then(() => assignInputRef())
		.catch((_error: unknown): void => undefined);
};

type OntarioInputProps = React.ComponentPropsWithoutRef<typeof GeneratedOntarioInput>;

const OntarioInputOverride = React.forwardRef<unknown, OntarioInputProps>((props, forwardedRef) => {
	const hostRef = React.useCallback(
		(hostElement: HTMLElement | null) => {
			mapHostRefToNativeInput(hostElement, forwardedRef);
		},
		[forwardedRef],
	);

	return React.createElement(GeneratedOntarioInput, {
		...props,
		ref: hostRef,
	});
});

OntarioInputOverride.displayName = 'OntarioInput';

export const OntarioInput = OntarioInputOverride as typeof GeneratedOntarioInput;
