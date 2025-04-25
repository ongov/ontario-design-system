import stencilSSR from '@stencil/ssr/next';

const nextConfig = {
	/* config options here */
};

const withStencil = stencilSSR({
	module: () => import('@ongov/ontario-design-system-component-library-react'),
	from: '@ongov/ontario-design-system-component-library-react',
	hydrateModule: () => import('@ongov/ontario-design-system-component-library/hydrate'),
	serializeShadowRoot: {
		scoped: ['ontario-button'],
		default: 'declarative-shadow-dom',
	},
});

export default withStencil(nextConfig);
