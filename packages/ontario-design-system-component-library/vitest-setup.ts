import { beforeAll, expect } from 'vitest';

// Load the built Stencil components so their custom elements are registered for
// testing. The `pretest:unit` script runs `build:test` (a trimmed Stencil dev
// build) before the Vitest run, so the lazy-loader bundle is available here.
await import('./dist/ontario-design-system-components/ontario-design-system-components.esm.js');

// When the lazy-loader bundle is imported above, Stencil's `getAssetPath`
// resolves asset URLs against the bundle's location on disk, producing an
// absolute `file://` path that differs between machines (e.g. local vs CI).
// Normalize those URLs back to the stable `/assets/...` form so element
// snapshots are portable. The WeakSet guard prevents infinite recursion when
// the serializer re-prints the same element through @stencil/vitest's own
// serializer. Registration happens in `beforeAll` so this serializer is added
// after (and therefore checked before) @stencil/vitest's serializer.
const VOLATILE_ASSET_URL = /file:\/\/\S*?\/dist\/ontario-design-system-components\/assets\//g;
const normalizing = new WeakSet<object>();

beforeAll(() => {
	expect.addSnapshotSerializer({
		test(value: unknown): boolean {
			return (
				typeof value === 'object' &&
				value !== null &&
				!normalizing.has(value as object) &&
				(value as Node).nodeType === 1 &&
				typeof (value as Element).tagName === 'string' &&
				(value as Element).tagName.includes('-')
			);
		},
		serialize(value, config, indentation, depth, refs, printer) {
			normalizing.add(value as object);
			try {
				return printer(value, config, indentation, depth, refs).replace(VOLATILE_ASSET_URL, '/assets/');
			} finally {
				normalizing.delete(value as object);
			}
		},
	});
});

export {};
