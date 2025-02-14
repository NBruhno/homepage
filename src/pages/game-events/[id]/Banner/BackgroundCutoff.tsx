import { adjustHsl } from 'lib/client'
import { styled } from 'styled-components'

export const BackgroundCutoff = styled.div`
	position: absolute;
	top: 700px;
	left: 0;
	right: 0;
	width: 100%;
	height: calc(100% - 700px);
	z-index: 0;
	border-top: 1px solid ${({ theme }) => theme.color.border};

	@supports ((-webkit-backdrop-filter: blur(8px)) or (backdrop-filter: blur(8px))) {
		backdrop-filter: blur(8px);
		background: linear-gradient(
			to bottom,
			${({ theme }) => adjustHsl(theme.color.background, { alpha: theme.isDarkTheme ? 0.7 : 0.5 })},
			${({ theme }) => theme.color.background}
		);
	}

	${({ theme }) => theme.mediaQueries.maxMobile} {
		top: 236px;
		height: calc(100% - 236px);
	}
`
