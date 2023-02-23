import type { ReactNode } from 'react'

import { css, Global } from '@emotion/react'

import { fonts } from 'styles/fonts'
import { normalize } from 'styles/normalize'

import { adjustHsl } from 'lib/client'

export const globalCss = (theme: Theme) => css([
	fonts,
	normalize,
	{
		'*::-webkit-scrollbar': {
			backgroundColor: theme.color.background,
			width: '8px',
		},

		'*::-webkit-scrollbar-thumb': {
			backgroundColor: adjustHsl(theme.color.gray, { alpha: 0.7 }),
			borderRadius: '8px',
			border: 'none',

			transition: `background-color 150ms ${theme.animation.default}`,

			':hover': {
				backgroundColor: theme.color.gray,
				cursor: 'grab',
			},

			':active': {
				backgroundColor: theme.color.gray030,
			},
		},

		html: {
			fontFamily: 'Roboto, sans-serif',
			fontSize: '100%',
			backgroundColor: theme.color.background,
		},

		body: {
			color: theme.color.text,
			lineHeight: 1.65,
		},

		p: {
			marginBottom: '1.15rem',
		},

		'h1, h2, h3, h4, h5': {
			margin: '2.75rem 0 1.05rem',
			lineHeight: 1.15,
			fontWeight: theme.font.weight.regular,
			fontFamily: theme.font.family.poppins,
		},

		a: {
			color: theme.color.link,
		},

		'*': {
			scrollbarWidth: 'thin',
			scrollbarColor: theme.color.gray,
		},
	},
])

export const GlobalStyling = ({ children }: { children: ReactNode }) => (
	<>
		<Global styles={(theme) => globalCss(theme)} />
		{children}
	</>
)
