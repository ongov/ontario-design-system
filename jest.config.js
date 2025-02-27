module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
	modulePathIgnorePatterns: ['<rootDir>/dist/'],
	automock: false, // Ensures automocking doesn’t interfere
	moduleNameMapper: {
		'^fs$': '<rootDir>/__mocks__/fs.js', // Force Jest to use the mock
	},
};
