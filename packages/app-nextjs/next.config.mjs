import stencilSSR from '@stencil/ssr/next';

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default stencilSSR({
	module: import('@ongov/ontario-design-system-component-library-react'),
	from: '@ongov/ontario-design-system-component-library-react',
	hydrateModule: import('@ongov/ontario-design-system-component-library/hydrate/index.js'),
	serializeShadowRoot: {
		scoped: ['ontario-button'],
		default: 'declarative-shadow-dom',
	},
})(nextConfig);
