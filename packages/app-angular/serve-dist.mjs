// Minimal static file server for the built app, used by the Playwright web server.
// Falls back to index.html so deep links such as /components/ontario-button work.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('./dist/app-angular/browser/', import.meta.url));
const port = Number(process.env.PORT ?? 4200);

const mimeTypes = {
	'.html': 'text/html; charset=utf-8',
	'.js': 'text/javascript; charset=utf-8',
	'.mjs': 'text/javascript; charset=utf-8',
	'.css': 'text/css; charset=utf-8',
	'.json': 'application/json; charset=utf-8',
	'.svg': 'image/svg+xml',
	'.png': 'image/png',
	'.ico': 'image/x-icon',
	'.woff': 'font/woff',
	'.woff2': 'font/woff2',
	'.ttf': 'font/ttf',
	'.txt': 'text/plain; charset=utf-8',
};

const isFile = async (path) => {
	try {
		return (await stat(path)).isFile();
	} catch {
		return false;
	}
};

createServer(async (req, res) => {
	const { pathname } = new URL(req.url ?? '/', 'http://localhost');
	const requested = join(root, normalize(decodeURIComponent(pathname)));
	const filePath = requested.startsWith(root) && (await isFile(requested)) ? requested : join(root, 'index.html');

	try {
		const body = await readFile(filePath);
		res.writeHead(200, { 'Content-Type': mimeTypes[extname(filePath)] ?? 'application/octet-stream' });
		res.end(body);
	} catch {
		res.writeHead(404);
		res.end('Not found');
	}
}).listen(port, () => console.log(`Serving ${root} on http://localhost:${port}`));
