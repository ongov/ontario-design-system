import * as glob from 'glob-promise';
import * as JSZip from 'jszip';
import { join as pathJoin, sep as pathSeparator, parse as pathParse } from 'path';
import { PathLike, promises as fs } from 'fs';
import { Stream } from 'stream';

const exitCodeFailed = -1;
const ignoreItems: Array<string> = ['node_modules/**'];
const markdownGlob: string = '**/*.md';
const packageVersion = process.env.npm_package_version;
const outputFileName = `ontario-design-system-web-components-documentation-${packageVersion}.zip`;

class Documentation {
	static async build() {
		console.log('Finding files to process');
		const globOptions = { ignore: ignoreItems };
		const filePaths = await glob(markdownGlob, globOptions);

		const fileInfos = filePaths.map(filePath => {
			const filePathInfo = pathParse(filePath);

			// Expecting the folder path to be 'src/components/<component-name>/readme.md
			const sourceFolderName = filePathInfo.dir.split(pathSeparator)?.[1];
			const [componentNameFolder] = filePathInfo.dir.split(pathSeparator)?.slice(-1);
			const filename = filePathInfo.base;

			const newFileNameTemp = componentNameFolder ? `${componentNameFolder}-${filename}` : filename;
			const newFileName = sourceFolderName ? pathJoin(sourceFolderName, newFileNameTemp) : newFileNameTemp;
			return { originalFilePath: filePath, newFileName: newFileName };
		});

		console.log(
			'Files to compress:',
			fileInfos.map(fileInfo => `${fileInfo.originalFilePath} -> ${fileInfo.newFileName}`),
		);

		const zipFile = this.createZipFile();
		console.log('Adding files to zip file');
		await Promise.all(fileInfos.map(fileInfo => this.addFileToZipFile(zipFile, fileInfo.newFileName, fileInfo.originalFilePath)));

		try {
			console.log('Writing zip file to disk:', outputFileName);
			await this.writeZipFileToDisk(zipFile, outputFileName);
		} catch {
			process.exit(exitCodeFailed);
		}
	}

	static createZipFile(): JSZip {
		return new JSZip();
	}

	static async addFileToZipFile(zipFile: JSZip, fileName: string, filePath: PathLike | fs.FileHandle): Promise<JSZip> {
		return zipFile.file(fileName, await fs.readFile(filePath));
	}

	static async writeZipFileToDisk(zipFile: JSZip, zipFilePath: string): Promise<void> {
		const stream = zipFile.generateNodeStream({ type: 'nodebuffer', streamFiles: true });
		try {
			return await fs.writeFile(zipFilePath, await this.stream2buffer(stream));
		} catch (e) {
			const error = e as Error;
			console.error(error.stack);
		}
	}

	/**
	 * Convert a stream into a buffer.
	 *
	 * Based off of: https://stackoverflow.com/a/67729663
	 * @param stream Stream to convert
	 * @returns A buffer of the stream passed in
	 */
	static async stream2buffer(stream: Stream): Promise<Buffer> {
		return new Promise<Buffer>((resolve, reject) => {
			const _buf = Array<any>();

			stream.on('data', chunk => _buf.push(chunk));
			stream.on('end', () => resolve(Buffer.concat(_buf)));
			stream.on('error', err => reject(`error converting stream - ${err}`));
		});
	}
}

Documentation.build();
