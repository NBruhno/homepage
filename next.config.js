const path = require('path')

const withSourceMaps = require('@zeit/next-source-maps')
const withOffline = require('next-offline')

module.exports = withOffline(withSourceMaps({
	target: 'serverless',

	workboxOpts: {
		swDest: 'public/service-worker.js',
		runtimeCaching: [
			{
				urlPattern: /^https?.*/,
				handler: 'NetworkFirst',
				options: {
					cacheName: 'https-calls',
					networkTimeoutSeconds: 15,
					expiration: {
						maxEntries: 150,
						maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
					},
					cacheableResponse: {
						statuses: [0, 200],
					},
				},
			},
		],
	},

	exportPathMap: () => ({
		'/': { page: '/' },
		'/projects': { page: '/Projects' },
	}),

	webpack: (config) => {
		// Fixes npm packages that depend on `fs` module
		config.node = {
			fs: 'empty',
		}
		config.resolve.alias['components'] = path.join(__dirname, 'src/components')
		config.resolve.alias['lib'] = path.join(__dirname, 'src/lib')

		return config
	},
}))
