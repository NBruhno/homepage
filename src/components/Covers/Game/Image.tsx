import NextImage from 'next/image'
import { styled } from 'styled-components'

export const Image = styled(NextImage).attrs({
	loading: 'lazy',
	width: 264,
	height: 353,
	unoptimized: true,
})`
	height: 100%;
	width: 100%;
	aspect-ratio: 264 / 353;
	object-fit: cover;
	color: transparent;
	border-radius: 4px;

	// Prevent alt text from showing during image fetch
	img:-moz-loading {
		visibility: hidden;
	}
`
