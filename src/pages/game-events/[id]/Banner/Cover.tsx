import NextImage from 'next/image'
import { css, keyframes } from 'styled-components'
import { styled } from 'styled-components'

const imageWidth = 264
const imageHeight = 353
const animationDuration = 120

const scrollLeft = keyframes`
	to {
    left: -${imageWidth}px;
  }
`

const scrollRight = keyframes`
	to {
    right: -${imageWidth}px;
  }
`

type Props = {
	rowNumber: number
	index: number
	gamesRowLength: number
}

export const Cover = styled(NextImage).attrs(({ src }) => ({
	loading: 'lazy',
	priority: false,
	width: imageWidth,
	height: imageHeight,
	unoptimized: true,
	src,
}))<Props>`
	height: ${imageHeight}px;
	width: ${imageWidth}px;
	aspect-ratio: ${imageWidth} / ${imageHeight};
	object-fit: cover;
	border-radius: 0;
	position: absolute;
	top: 0;
	animation-timing-function: linear;
	animation-duration: ${animationDuration}s;
	animation-iteration-count: infinite;
	animation-delay: calc(${animationDuration}s / ${(props) => props.gamesRowLength} * (${({ gamesRowLength }) => gamesRowLength} - ${({ index }) => index + 1}) * -1);

	// Prevent alt text from showing during image fetch
	img:-moz-loading {
		visibility: hidden;
	}

	${(props) =>
		props.rowNumber % 2 === 0
			? css`
				left: max(calc(${imageWidth - 15}px * ${props.gamesRowLength}), 100%);
				animation-name: ${scrollLeft};
				will-change: left;
			`
			: css`
				right: max(calc(${imageWidth - 15}px * ${props.gamesRowLength}), 100%);
				animation-name: ${scrollRight};
				will-change: right;
			`}
`
