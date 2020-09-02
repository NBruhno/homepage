require('dotenv').config()

const TEST_REGEX = '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|js?|tsx?|ts?)$'

module.exports = {
	setupFiles: ['<rootDir>/jest.setup.js'],
	testRegex: TEST_REGEX,
	transform: {
		'^.+\\.tsx?$': 'babel-jest',
	},
	transformIgnorePatterns: [
		'<rootDir>/node_modules/(?!lodash-es)',
	],
	moduleNameMapper: {
		'^lodash-es$': 'lodash',
	},
	testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/', '<rootDir>/public/', '<rootDir>/.storybook/'],
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
	moduleDirectories: ['node_modules', 'src'],
	collectCoverage: false,
}
