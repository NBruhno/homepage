import NextImage from 'next/image'
import { styled } from 'styled-components'

export const Image = styled(NextImage).attrs({
	loading: 'eager',
	priority: true,
	width: 1920,
	height: 1080,
	unoptimized: true,
})`
	height: 100%;
	width: 100%;
	object-fit: cover;
	color: transparent;
	margin: 0;
	border-radius: 8px;
	aspect-ratio: 16 / 9;

	// Prevent alt text from showing during image fetch
	img:-moz-loading {
		visibility: hidden;
	}

	${({ theme }) => theme.mediaQueries.maxMobile} {
		width: 100%;
		max-width: unset;
		height: auto;
		max-height: unset;
	}
`
