module.exports = {
	presets: [
		['next/babel', { 'preset-react': { importSource: '@emotion/core' } }],
	],
	plugins: [
		['polished'],
	],
	env: {
		production: {
			plugins: [
				['emotion'],
			],
		},
		development: {
			plugins: [
				['emotion', { sourceMap: true }],
			],
		},
	},
}
