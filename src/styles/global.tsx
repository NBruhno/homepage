import { css, Global } from '@emotion/core'

import { normalize } from 'styles/normalize'
import { fonts } from 'styles/fonts'

export const globalCss = (theme: Theme) => css([
	normalize,
	fonts,
	{
		'*::-webkit-scrollbar': {
			backgroundColor: theme.color.background,
			width: '8px',
		},

		'*::-webkit-scrollbar-thumb': {
			backgroundColor: theme.color.gray,
			borderRadius: '8px',
			border: 'none',
		},

		html: {
			fontFamily: 'Roboto, sans-serif',
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
			fontFamily: theme.fontFamily.poppins,
		},
	},
])

export const GlobalStyling = ({ children }: { children: React.ReactNode }) => (
	<>
		<Global styles={(theme: Theme) => globalCss(theme)} />
		{children}
	</>
)
