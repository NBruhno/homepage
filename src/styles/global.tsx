import type { ReactNode } from 'react'

import { createGlobalStyle } from 'styled-components'

import { fonts } from 'styles/fonts'
import { normalize } from 'styles/normalize'

import { adjustHsl } from 'lib/client'

export const GlobalStyle = createGlobalStyle`
	${fonts}
	${normalize}

	*::-webkit-scrollbar {
		background-color: ${({ theme }) => theme.color.background};
		width: 8px;
	}

	*::-webkit-scrollbar-thumb {
		background-color: ${({ theme }) => adjustHsl(theme.color.gray, { alpha: 0.7 })};
		border-radius: 8px;
		border: none;

		transition: background-color 150ms ${({ theme }) => theme.animation.default};

		&:hover {
			background-color: ${({ theme }) => theme.color.gray};
			cursor: grab;
		}

		&:active {
			background-color: ${({ theme }) => theme.color.gray030};
		}
	}

	html {
		font-family: Roboto, sans-serif;
		font-size: 100%;
		background-color: ${({ theme }) => theme.color.background};
	}

	body {
		color: ${({ theme }) => theme.color.text};
		line-height: 1.65;
	}

	p {
		margin-bottom: 1.15rem;
	}

	h1, h2, h3, h4, h5 {
		margin: 2.75rem 0 1.05rem;
		line-height: 1.15;
		font-weight: ${({ theme }) => theme.font.weight.regular};
		font-family: ${({ theme }) => theme.font.family.poppins};
	}

	a {
		color: ${({ theme }) => theme.color.link};
	}

	* {
		scrollbar-width: thin;
		scrollbar-color: ${({ theme }) => theme.color.gray};
	}
`

export const GlobalStyling = ({ children }: { children: ReactNode }) => (
	<>
		<GlobalStyle />
		{children}
	</>
)
