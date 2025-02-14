import { styled } from 'styled-components'

type Props = {
	loading?: string
}

export const Image = styled.img.attrs({
	alt: 'project cover',
})<Props>`
	height: 100%;
	width: 100%;
	object-fit: cover;

	/* Prevent alt text from showing during image fetch */
	img:-moz-loading {
		visibility: hidden;
	}
`
