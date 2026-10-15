import coreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

const eslintConfig = [
	...coreWebVitals,
	...nextTypescript,
	{
		// Allow unescaped quotes in component docs/examples.
		rules: {
			'react/no-unescaped-entities': 'off',
		},
	},
];

export default eslintConfig;
