import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

export const pkgImporter = (url: string) => {
	if (!url?.startsWith('pkg:')) return null;

	const spec = url.slice('pkg:'.length);

	try {
		return { file: require.resolve(spec) };
	} catch {}
	try {
		return { file: require.resolve(`${spec}.scss`) };
	} catch {}

	try {
		const parts = spec.split('/');
		const base = parts.pop();
		const dir = parts.join('/');
		return { file: require.resolve(`${dir}/_${base}.scss`) };
	} catch {}

	return null;
};
