import type { GameImagePlaceholder } from 'types'

import NextImage from 'next/image'

/* eslint-disable @next/next/no-img-element */
type Props = {
	src: string | null,
	imageProps: GameImagePlaceholder | undefined,
}

const placeholderImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAUAAarVyFEAAAAASUVORK5CYII='

export const Background = ({ src, imageProps, ...rest }: Props) => (
	<NextImage
		css={(theme) => ({
			width: 'calc(100% + 25px)',
			height: 'calc(100% + 25px)',
			filter: 'blur(5px) brightness(0.7)',
			background: [theme.color.inputBackgroundHover, `linear-gradient(134deg, ${theme.color.inputBorder} 0%, ${theme.color.inputBackgroundHover} 63%, ${theme.color.inputBackground} 100%)`],
			objectFit: 'cover',
			objectPosition: 'center',
			margin: '-15px',
		})}
		alt='background'
		loading='eager'
		quality={100}
		unoptimized
		priority
		layout='raw'
		height='100%'
		width='100%'
		placeholder={imageProps ? 'blur' : 'empty'}
		{...imageProps}
		src={src ?? placeholderImage}
		{...rest}
	/>
)
