import path from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
	define: {
		'process.env': process.env,
	},
	resolve: {
		alias: {
			components: path.resolve(__dirname, 'src/components'),
			'config.client': path.resolve(__dirname, 'src/config.client'),
			'config.server': path.resolve(__dirname, 'src/config.server'),
			lib: path.resolve(__dirname, 'src/lib'),
			pages: path.resolve(__dirname, 'src/pages'),
			states: path.resolve(__dirname, 'src/states'),
			styles: path.resolve(__dirname, 'src/styles'),
			types: path.resolve(__dirname, 'src/types'),
			validation: path.resolve(__dirname, 'src/validation'),
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
	server: {
		open: 'none',
	},
})
