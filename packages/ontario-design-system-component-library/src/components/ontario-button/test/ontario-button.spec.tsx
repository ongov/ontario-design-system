import { Test, testSuites } from './ontario-button.test.config';

let unitTests = new Test();

/**
 * iterates through the `testSuites` array and generates cases for each suite to be executed based on the configuration data
 */
testSuites.forEach((testSuite: any) => {
	unitTests.getUnitTestSuite(testSuite);
});
