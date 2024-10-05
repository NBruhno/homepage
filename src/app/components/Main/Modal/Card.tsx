import styled from 'styled-components'

import { adjustHsl } from 'lib/client'

import { Card as DefaultCard } from 'components/Card'
import { Content } from 'components/Card/Content'

export const Card = styled(DefaultCard)`
	text-align: center;
	width: 100%;

	${({ theme }) => theme.mediaQueries.maxMobile} {
		margin-bottom: 0;
		border-radius: 0;
		border-left: none;
		border-bottom: none;
		border-right: none;
	}

	@supports ((-webkit-backdrop-filter: blur(5px)) or (backdrop-filter: blur(5px))) {
		background-color: ${({ theme }) => adjustHsl(theme.color.background, { alpha: 0.9 })};
	}

	> ${Content} {
		max-height: calc(100vh - 128px);
		overflow-y: scroll;
		overscroll-behavior: contain;

		${({ theme }) => theme.mediaQueries.maxMobile} {
			max-height: 50vh;
		}
	}
`
