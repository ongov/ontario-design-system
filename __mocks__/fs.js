'use strict';

const path = require('path');

const fs = jest.createMockFromModule('fs');

let mockFiles = Object.create(null);

function __setMockFiles(newMockFiles) {
	mockFiles = Object.create(null);
	for (const file in newMockFiles) {
		const dir = path.dirname(file);
		if (!mockFiles[dir]) {
			mockFiles[dir] = [];
		}
		mockFiles[dir].push(path.basename(file));
	}
}

function readdirSync(directoryPath) {
	return mockFiles[directoryPath] || [];
}

function existsSync(filePath) {
	return !!mockFiles[filePath];
}

function mkdirSync(directoryPath) {
	if (!mockFiles[directoryPath]) {
		mockFiles[directoryPath] = [];
	}
}

function writeFileSync(filePath, data) {
	mockFiles[filePath] = data;
}

fs.__setMockFiles = __setMockFiles;
fs.readdirSync = readdirSync;
fs.existsSync = existsSync;
fs.mkdirSync = mkdirSync;
fs.writeFileSync = writeFileSync;

module.exports = fs;
