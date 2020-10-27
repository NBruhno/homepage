require('dotenv').config()

const TEST_REGEX = '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|js?|tsx?|ts?)$'

module.exports = {
	setupFiles: ['<rootDir>/jest.setup.js'],
	testRegex: TEST_REGEX,
	transform: {
		'^.+\\.[tj]sx?$': 'babel-jest',
		'^.+\\.mdx?$': '@storybook/addon-docs/jest-transform-mdx',
	},
	transformIgnorePatterns: [
		'<rootDir>/node_modules/(?!lodash-es)',
	],
	moduleNameMapper: {
		'^lodash-es$': 'lodash',
	},
	testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/', '<rootDir>/public/'],
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
	moduleDirectories: ['node_modules', 'src'],
	collectCoverage: false,
}
