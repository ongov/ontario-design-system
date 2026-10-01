import stencilSSR from '@stencil/ssr/next';
import { pkgImporter } from '@ongov/ontario-design-system-component-library-react/next/sass-pkg-importer';

/** @type {import('next').NextConfig} */
const nextConfig = {
	sassOptions: {
		// `sassOptions.importer` (legacy Sass JS API) was removed in `sass-loader@17`,
		// which Next.js 16 depends on — use the modern `importers` (FileImporter) API instead.
		importers: [pkgImporter],
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
