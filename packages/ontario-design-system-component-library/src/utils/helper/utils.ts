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

export function isNumber(str: string): boolean {
	const pattern = /^\d+\.?\d*$/;
	return pattern.test(str);
}

export function isEmpty(str: string | undefined | null): boolean {
	return !str || str?.length <= 0;
}
