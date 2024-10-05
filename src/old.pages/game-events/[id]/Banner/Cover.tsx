import { keyframes } from '@emotion/react'
import NextImage from 'next/image'

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
	src: string,
	rowNumber: number,
	index: number,
	gamesRowLength: number,
}

export const Cover = ({ src, rowNumber, index, gamesRowLength }: Props) => (

	<NextImage
		css={[
			{
				height: `${imageHeight}px`,
				width: `${imageWidth}px`,
				aspectRatio: `${imageWidth} / ${imageHeight}`,
				objectFit: 'cover',
				borderRadius: 0,
				position: 'absolute',
				top: 0,
				animationTimingFunction: 'linear',
				animationDuration: `${animationDuration}s`,
				animationIterationCount: 'infinite',
				animationDelay: `calc(${animationDuration}s / ${gamesRowLength} * (${gamesRowLength} - ${index + 1}) * -1)`,
				// Prevent alt text from showing during image fetch
				'img:-moz-loading': {
					visibility: 'hidden',
				},
			},
			rowNumber % 2 === 0 ? {
				left: `max(calc(${imageWidth - 15}px * ${gamesRowLength}), 100%)`,
				animationName: scrollLeft,
				willChange: 'left',
			} : {
				right: `max(calc(${imageWidth - 15}px * ${gamesRowLength}), 100%)`,
				animationName: scrollRight,
				willChange: 'right',
			},
		]}
		alt='game cover'
		loading='lazy'
		priority={false}
		width={imageWidth}
		height={imageHeight}
		unoptimized
		src={src}
	/>
)
