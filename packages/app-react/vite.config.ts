import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { NodePackageImporter } from 'sass-embedded';

const workspaceRoot = path.resolve(__dirname, '../..');

export default defineConfig({
	base: './',
	plugins: [react()],
	css: {
		preprocessorMaxWorkers: 0,
		preprocessorOptions: {
			scss: {
				api: 'modern-compiler',
				loadPaths: [path.resolve(__dirname, 'node_modules')],
				importers: [new NodePackageImporter(workspaceRoot)],
			},
		},
	},
	build: {
		outDir: 'build',
	},
});
