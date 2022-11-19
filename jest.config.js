require('dotenv').config()
const nextJest = require('next/jest')

const TEST_REGEX = '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts?|js?)$'
const createConfig = nextJest({ dir: './' })

const config = {
	testRegex: TEST_REGEX,
	transformIgnorePatterns: [
		'<rootDir>/node_modules/(?!lodash-es)',
	],
	testEnvironment: 'jsdom',
	testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/', '<rootDir>/public/'],
	moduleFileExtensions: ['ts', 'js'],
	moduleDirectories: ['node_modules', 'src'],
	collectCoverage: false,
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
}

module.exports = createConfig(config)
