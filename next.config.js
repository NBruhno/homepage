const path = require('path')

const withSourceMaps = require('@zeit/next-source-maps')

module.exports = withSourceMaps({
	webpack: (config) => {
		// Fixes npm packages that depend on `fs` module
		config.node = {
			fs: 'empty',
		}
		config.resolve.alias['components'] = path.join(__dirname, 'src/components')
		config.resolve.alias['lib'] = path.join(__dirname, 'src/lib')

		return config
	},
})
