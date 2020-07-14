import { css } from '@emotion/core'

import { normalize } from 'styles/normalize'
import { fonts } from 'styles/fonts'

export const globalCss = css([
	normalize,
	fonts,
	{
		'*': {
			fontFamily: 'Roboto, sans-serif',
		},

		'*::-webkit-scrollbar': {
			backgroundColor: 'none',
			width: '8px',
		},

		'*::-webkit-scrollbar-thumb': {
			backgroundColor: '#8a9bb2',
			borderRadius: '8px',
			border: 'none',
		},

		html: {
			fontSize: '100%',
		},

		body: {
			lineHeight: 1.65,
		},

		p: {
			marginBottom: '1.15rem',
		},

		'h1, h2, h3, h4, h5': {
			margin: '2.75rem 0 1.05rem',
			lineHeight: 1.15,
			fontWeight: 400,
		},
	},
])
