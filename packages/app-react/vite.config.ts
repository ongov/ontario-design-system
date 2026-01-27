import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
	base: './',
	plugins: [react()],
	css: {
		preprocessorOptions: {
			scss: {
				loadPaths: [path.resolve(__dirname, 'node_modules')],
			},
		},
	},
	build: {
		outDir: 'build',
	},
});
