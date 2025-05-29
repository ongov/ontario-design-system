import 'dotenv/config';

import { writeFile } from 'fs/promises';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

// @ts-ignore: TS error due to usage of import.meta.url in CommonJS context
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = dirname(__filename);

const outputPath = resolve(__dirname, '..', 'src', 'config.json');

const data = {
	ONTARIO_HEADER_API_URL_EN: process.env.ONTARIO_HEADER_API_URL_EN || '',
	ONTARIO_HEADER_API_URL_FR: process.env.ONTARIO_HEADER_API_URL_FR || '',
};

const fileContent = JSON.stringify(data);

Promise.all([writeFile(outputPath, fileContent, 'utf-8')]);
