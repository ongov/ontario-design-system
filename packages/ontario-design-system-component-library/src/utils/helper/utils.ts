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
