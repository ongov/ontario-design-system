import stencilSSR from '@stencil/ssr/next';
import { pkgImporter } from '@ongov/ontario-design-system-component-library-react/next/sass-pkg-importer';

/** @type {import('next').NextConfig} */
const nextConfig = {
	sassOptions: {
		importer: [pkgImporter],
	},
};

export default stencilSSR({
	module: import('@ongov/ontario-design-system-component-library-react'),
	from: '@ongov/ontario-design-system-component-library-react',
	hydrateModule: import('@ongov/ontario-design-system-component-library/hydrate'),
	serializeShadowRoot: {
		scoped: ['ontario-button'],
		default: 'declarative-shadow-dom',
	},
})(nextConfig);
