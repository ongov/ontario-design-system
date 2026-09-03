import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { NodePackageImporter } from 'sass-embedded';

const workspaceRoot = path.resolve(__dirname, '../..');

export default defineConfig({
	base: './',
	plugins: [react()],
	server: {
		// Bind to all interfaces (not just IPv6 localhost) so the dev server is
		// reachable from Docker/devcontainer/Codespaces port forwarding, which
		// connects over IPv4. Without this, `vite`'s default `localhost` binding
		// resolves to `::1` only in most container network stacks, and the
		// forwarded port hangs indefinitely.
		host: true,
	},
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
