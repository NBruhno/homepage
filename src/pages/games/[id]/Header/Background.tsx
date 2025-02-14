import { styled } from 'styled-components'

import NextImage from 'next/image'

export const Background = styled(NextImage).attrs({
	alt: 'background',
	loading: 'eager',
	quality: 100,
	unoptimized: true,
	priority: true,
	width: 1571,
	height: 1000,
})`
	min-width: calc(100% + 25px);
	min-height: 1000px;
	height: calc(100% + 500px);
	max-height: 100vh;
	filter: blur(8px) brightness(0.8);
	background: ${({ theme }) => [theme.color.input.backgroundHover, `linear-gradient(134deg, ${theme.color.input.border} 0%, ${theme.color.input.backgroundHover} 63%, ${theme.color.input.background} 100%)`]};
	object-fit: cover;
	object-position: center;
	margin: -15px;
	overflow: none;

	${({ theme }) => theme.mediaQueries.tabletToDesktop} {
		filter: blur(3px) brightness(0.8);
	}

	${({ theme }) => theme.mediaQueries.wearableToTablet} {
		filter: blur(2px) brightness(0.8);
	}

	${({ theme }) => theme.mediaQueries.maxMobile} {
		min-height: 600px;
	}
`
