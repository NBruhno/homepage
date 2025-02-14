import { styled } from 'styled-components'

import { adjustHsl } from 'lib/client'

import { Card as DefaultCard } from 'components/Card'
import { Content } from 'components/Card/Content'

export const Card = styled(DefaultCard)`
	text-align: center;

	${({ theme }) => theme.mediaQueries.maxMobile} {
		margin-bottom: 0;
		border-radius: 0;
		border-left: none;
		border-bottom: none;
		border-right: none;
	}

	@supports ((-webkit-backdrop-filter: blur(10px)) or (backdrop-filter: blur(10px))) {
		backdrop-filter: blur(6px) brightness(75%) saturate(150%);
		background: linear-gradient(154deg, ${({ theme }) => adjustHsl(theme.color.gray020, { alpha: 0.45 })} 4.87%, ${({ theme }) => adjustHsl(theme.color.gray010, { alpha: 0.8 })} 75.88%);
		border-color: ${({ theme }) => adjustHsl(theme.color.gray020, { alpha: 0.7 })};
		box-shadow: inset 0 1px 1px 0 ${({ theme }) => adjustHsl(theme.color.gray020, { alpha: 0.15 })};
	}

	> div > div > ${Content} {
		max-height: calc(100vh - 128px);

		${({ theme }) => theme.mediaQueries.maxMobile} {
			max-height: 50vh;
		}
	}
`
