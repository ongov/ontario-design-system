import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import puppeteer from 'puppeteer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const samplesDir = resolve(__dirname, '..', 'docs', 'samples');
const pageUrl = 'file://' + join(samplesDir, 'sample-button.html');
const outputPath = join(samplesDir, 'sample-button.png');

const browser = await puppeteer.launch({
	headless: 'new',
	args: ['--no-sandbox', '--disable-setuid-sandbox'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 720 });
await page.goto(pageUrl);
await new Promise((resolve) => setTimeout(resolve, 500));
await page.screenshot({ path: outputPath, fullPage: true });
await browser.close();

console.log(`Saved screenshot to ${outputPath}`);
