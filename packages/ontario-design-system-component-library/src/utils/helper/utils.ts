import { Conjunction } from './utils-types';

export function format(first: string | undefined, middle: string | undefined, last: string | undefined): string {
	return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}

export function hasMultipleTrueValues<T>(arr: T[], key: keyof T): boolean {
	let count = 0;

	for (const obj of arr) {
		if (obj[key] === true || obj[key] === 'true') {
			count++;
			if (count > 1) {
				return true;
			}
		}
	}

	return false;
}

export function extractValuesByKey<T>(objects: T[], key: keyof T): Array<T[keyof T]> {
	return objects.map((obj) => obj[key]);
}

export function organizeObjectKeys(data: any[], columns: string[]): any[] {
	return data.map((item) => {
		const newData: any = {};
		const otherKeys: any = {};

		// Iterate through each key in the item
		Object.keys(item).forEach((key) => {
			if (key === 'data') {
				// Organize keys in the 'data' object
				columns.forEach((column) => {
					if (column in item.data) {
						newData[column] = item.data[column];
					}
				});
			} else {
				// Preserve other keys
				otherKeys[key] = item[key];
			}
		});

		return { data: newData, ...otherKeys };
	});
}

export function removeObjectsBySpecificKey<T>(objects: T[], key: keyof T, value: boolean | 'true'): [T[], T[]] {
	const removedObjects: T[] = [];
	const filteredObjects = objects.filter((obj) => {
		if (obj[key] === value) {
			removedObjects.push(obj);
			return false;
		}
		return true;
	});
	return [filteredObjects, removedObjects];
}

/**
 * Takes an input value and determines whether or not it is a number.
 *
 * @param {string | number} value - The value you would like to test against.
 *
 * @returns {boolean}
 */
export function isNumber(value: string | number): boolean {
	if (value === undefined || value === null) return false;
	return isNaN(Number(value)) === false;
}

export function isEmpty(str: string | undefined | null): boolean {
	return !str || str?.length <= 0;
}

/**
 * Retrieves the keys from an enum and lists them in an array.
 *
 * @param {object} enumObject - The enum you wish to get the keys of.
 *
 * @returns {string[]}
 */
export function retrieveEnumKeys(enumObject: object): string[] {
	if (enumObject === undefined || enumObject === null) return new Array<string>(0);
	return Object.keys(enumObject).filter((key) => !isNumber(key));
}

/**
 * Prints an array as a comma delimited list, with the last element being preceded by a conjunction.
 * As per ontario.ca content guidelines, there is no Oxford comma.
 *
 * @param {Array<any>} arr - The array that you wish to print.
 * @param {Conjunction} conjunctionType - Whether you want the sentence to end with 'and value.' or 'or value.'
 *
 * @returns {string}
 */
export function printArray(arr: Array<any>, conjunctionType: Conjunction = 'and'): string {
	return [...arr].reduce(
		(text, value, i, array) => text + (i < array.length - 1 ? ', ' : ` ${conjunctionType} `) + value,
	);
}

/**
 * Grabs the HTML element of the page.
 *
 * More targetted than document.documentElement as the documentElement could
 * in theory be any element that is the top level. e.g. <div> if the page is not
 * set up to be semantically correct.
 *
 * @returns {HTMLElement}
 */
export function getRootHTMLElement(): HTMLElement {
	return document.getElementsByTagName('html')[0];
}
