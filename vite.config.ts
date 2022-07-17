import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
	resolve: {
		alias: {
			components: '/home/bruhno/projects/homepage/src/components',
			'config.client': '/home/bruhno/projects/homepage/src/config.client',
			'config.server': '/home/bruhno/projects/homepage/src/config.server',
			lib: '/home/bruhno/projects/homepage/src/lib',
			pages: '/home/bruhno/projects/homepage/src/pages',
			states: '/home/bruhno/projects/homepage/src/states',
			styles: '/home/bruhno/projects/homepage/src/styles',
			types: '/home/bruhno/projects/homepage/src/types',
			validation: '/home/bruhno/projects/homepage/src/validation',
		},
	},
	publicDir: 'public',
	plugins: [
		react({
			fastRefresh: true,
			jsxImportSource: '@emotion/react',
			babel: {
				plugins: ['@emotion'],
			},
		}),
	],
	esbuild: {
		logOverride: { 'this-is-undefined-in-esm': 'silent' },
	},
	base: '/ladle/',
})
