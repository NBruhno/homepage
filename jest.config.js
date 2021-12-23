require('dotenv').config()

const TEST_REGEX = '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts?|js?)$'

module.exports = {
	testRegex: TEST_REGEX,
	transform: {
		'^.+\\.[tj]sx?$': 'babel-jest',
	},
	transformIgnorePatterns: [
		'<rootDir>/node_modules/(?!lodash-es)',
	],
	moduleNameMapper: {
		'^lodash-es$': 'lodash',
	},
	testEnvironment: 'jsdom',
	testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/', '<rootDir>/public/'],
	moduleFileExtensions: ['ts', 'js'],
	moduleDirectories: ['node_modules', 'src'],
	collectCoverage: false,
}
