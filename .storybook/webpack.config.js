const path = require('path')

module.exports = ({ config }) => {
	config.module.rules.push({
		test: /\.(ts|tsx)$/,
		loader: require.resolve('babel-loader'),
		options: {
			presets: [
				['react-app', { flow: false, typescript: true }],
				require.resolve("@emotion/babel-preset-css-prop"),
			],
			plugins: [
				['emotion'],
				['react-require'],
				['polished'],
			],
			babelrc: false,
		},
	});
	config.resolve.extensions.push('.ts', '.tsx');
	
	config.node = { fs: 'empty' }

	config.resolve.alias['components'] = path.join(__dirname, '../src/components')
	config.resolve.alias['hooks'] = path.join(__dirname, '../src/hooks')
	config.resolve.alias['lib'] = path.join(__dirname, '../src/lib')
	config.resolve.alias['states'] = path.join(__dirname, '../src/states')
	config.resolve.alias['styles'] = path.join(__dirname, '../src/styles')
	config.resolve.alias['types'] = path.join(__dirname, '../src/types')
	config.resolve.alias['utils'] = path.join(__dirname, '../src/utils')
	config.resolve.alias['config.client$'] = path.join(__dirname, '../src/config.client.ts')
	return config;
}
