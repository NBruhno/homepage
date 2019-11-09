const path = require('path')

module.exports = {
	webpack: (config) => {
		// Fixes npm packages that depend on `fs` module
		config.node = {
			fs: 'empty',
		}
		config.resolve.alias['components'] = path.join(__dirname, 'src/components')

		return config
	},
}
