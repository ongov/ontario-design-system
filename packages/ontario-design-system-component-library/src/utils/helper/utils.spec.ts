import { format, isNumber, retrieveEnumKeys } from './utils';

describe('format', () => {
	it('returns empty string for no names defined', () => {
		expect(format(undefined, undefined, undefined)).toEqual('');
	});

	it('formats just first names', () => {
		expect(format('Joseph', undefined, undefined)).toEqual('Joseph');
	});

	it('formats first and last names', () => {
		expect(format('Joseph', undefined, 'Publique')).toEqual('Joseph Publique');
	});

	it('formats first, middle and last names', () => {
		expect(format('Joseph', 'Quincy', 'Publique')).toEqual('Joseph Quincy Publique');
	});
});

describe('isNumber', () => {
	it('should return false if value is undefined', () => {
		const value: any = undefined;

		const result = isNumber(value);
		expect(result).toEqual(false);
	});

	it('should return false if value that is null', () => {
		const value: any = null;

		const result = isNumber(value);
		expect(result).toEqual(false);
	});

	it('should return true if value is a number', () => {
		const value: number = 2000;

		const result = isNumber(value);
		expect(result).toEqual(true);
	});

	it('should return true if value is a number as a string', () => {
		const value: string = '2000';

		const result = isNumber(value);
		expect(result).toEqual(true);
	});

	it('should return false if value is not a number string', () => {
		const value: string = 'two-thousand';

		const result = isNumber(value);
		expect(result).toEqual(false);
	});
});

describe('isNumber', () => {
	it('should return false if value is undefined', () => {
		const value: any = undefined;

		const result = isNumber(value);
		expect(result).toEqual(false);
	});

	it('should return false if value that is null', () => {
		const value: any = null;

		const result = isNumber(value);
		expect(result).toEqual(false);
	});

	it('should return true if value is a number', () => {
		const value: number = 2000;

		const result = isNumber(value);
		expect(result).toEqual(true);
	});

	it('should return true if value is a number as a string', () => {
		const value: string = '2000';

		const result = isNumber(value);
		expect(result).toEqual(true);
	});

	it('should return false if value is not a number string', () => {
		const value: string = 'two-thousand';

		const result = isNumber(value);
		expect(result).toEqual(false);
	});
});

enum ColourEnumNumeric {
	RED,
	ORANGE,
	YELLOW,
	GREEN,
	BLUE,
	INDIGO,
	VIOLET,
}

enum ColourEnumString {
	'red' = 'Red',
	'orange' = 'Orange',
	'yellow' = 'Yellow',
	'green' = 'Green',
	'blue' = 'Blue',
	'indigo' = 'Indigo',
	'violet' = 'Violet',
}

describe('retrieveEnumKeys', () => {
	it('should return empty array if enumObject is undefined', () => {
		const expectedResult = new Array<string>(0);
		const enumObject: any = undefined;

		const result = retrieveEnumKeys(enumObject);
		expect(result).toEqual(expectedResult);
	});

	it('should return empty array if enumObject is null', () => {
		const expectedResult = new Array<string>(0);
		const enumObject: any = null;

		const result = retrieveEnumKeys(enumObject);
		expect(result).toEqual(expectedResult);
	});

	it('should return keys from numerical enum', () => {
		const expectedResult = ['RED', 'ORANGE', 'YELLOW', 'GREEN', 'BLUE', 'INDIGO', 'VIOLET'];

		const result = retrieveEnumKeys(ColourEnumNumeric);
		expect(result).toEqual(expectedResult);
	});

	it('should return keys from string enum', () => {
		const expectedResult = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

		const result = retrieveEnumKeys(ColourEnumString);
		expect(result).toEqual(expectedResult);
	});
});
