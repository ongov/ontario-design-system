require('dotenv').config();

const fs = require('fs');
const path = require('path');

const outputPath = path.resolve(__dirname, '..', 'src', 'config.json');

const data = {
	ONTARIO_HEADER_API_URL_EN: process.env.ONTARIO_HEADER_API_URL_EN || '',
	ONTARIO_HEADER_API_URL_FR: process.env.ONTARIO_HEADER_API_URL_FR || '',
};

const fileContent = JSON.stringify(data);

fs.writeFileSync(outputPath, fileContent, 'utf-8');
