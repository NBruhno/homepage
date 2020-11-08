const path = require('path')
const webpack = require('webpack')

module.exports = ({ config }) => {
	config.module.rules.push({
		test: /\.(ts|tsx)$/,
		loader: require.resolve('babel-loader'),
		options: {
			presets: [
				['next/babel', { 'preset-react': { runtime: 'classic', importSource: '@emotion/core' } }],
				require.resolve("@emotion/babel-preset-css-prop"),
			],
			plugins: [
				['emotion'],
				['polished'],
			],
			babelrc: false,
		},
	});
	config.resolve.extensions.push('.ts', '.tsx');
	
	config.node = { fs: 'empty' }

	config.resolve.alias['components'] = path.join(__dirname, '../src/components')
	config.resolve.alias['lib'] = path.join(__dirname, '../src/lib')
	config.resolve.alias['states'] = path.join(__dirname, '../src/states')
	config.resolve.alias['styles'] = path.join(__dirname, '../src/styles')
	config.resolve.alias['types'] = path.join(__dirname, '../src/types')
	config.resolve.alias['config.client$'] = path.join(__dirname, '../src/config.client.ts')
	return config;
}
