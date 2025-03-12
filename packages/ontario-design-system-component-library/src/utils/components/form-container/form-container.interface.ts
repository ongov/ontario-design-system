export enum FormGap {
	Default = 40,
	Condensed = 16,
}

export interface OntarioFormContainer extends HTMLElement {
	gap: 'default' | 'condensed';
}
