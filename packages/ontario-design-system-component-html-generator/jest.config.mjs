/** @type {import('jest').Config} */
export default {
	preset: 'ts-jest',
	testEnvironment: 'node',
	// Map .js extension imports in source to their .ts counterparts
	moduleNameMapper: {
		'^(\\.{1,2}/.*)\\.js$': '$1',
	},
	transform: {
		'^.+\\.tsx?$': [
			'ts-jest',
			{
				tsconfig: {
					module: 'CommonJS',
					moduleResolution: 'node',
				},
			},
		],
	},
	testMatch: ['**/src/**/*.test.ts'],
};
