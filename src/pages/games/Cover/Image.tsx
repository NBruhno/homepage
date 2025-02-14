import NextImage from 'next/image'
import { styled } from 'styled-components'

type Props = {
	isPriority: boolean
}

export const Image = styled(NextImage).attrs(({ priority }) => ({
	loading: priority ? 'eager' : 'lazy',
	priority,
	width: 264,
	height: 353,
	unoptimized: true,
}))<Props>`
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
