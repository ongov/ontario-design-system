import 'dotenv/config';

import { writeFile } from 'fs/promises';
import { resolve } from 'path';

const outputPath = resolve(__dirname, '..', 'src', 'config.json');

const data = {
	ONTARIO_HEADER_API_URL_EN: process.env.ONTARIO_HEADER_API_URL_EN || '',
	ONTARIO_HEADER_API_URL_FR: process.env.ONTARIO_HEADER_API_URL_FR || '',
};

const fileContent = JSON.stringify(data);

Promise.all([writeFile(outputPath, fileContent, 'utf-8')]);
