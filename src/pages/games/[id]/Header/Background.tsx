import type { GameImagePlaceholder } from 'types'

import NextImage from 'next/future/image'

/* eslint-disable @next/next/no-img-element */
type Props = {
	src: string | null,
	imageProps: GameImagePlaceholder | undefined,
}

export const Background = ({ src, imageProps, ...rest }: Props) => {
	if (!src) return null

	return (
		<NextImage
			css={(theme) => ({
				width: 'calc(100% + 25px)',
				height: 'calc(100% + 25px)',
				filter: 'blur(4px) brightness(0.7)',
				background: [theme.color.inputBackgroundHover, `linear-gradient(134deg, ${theme.color.inputBorder} 0%, ${theme.color.inputBackgroundHover} 63%, ${theme.color.inputBackground} 100%)`],
				objectFit: 'cover',
				objectPosition: 'center',
				margin: '-15px',

				[theme.mediaQueries.tabletToDesktop]: {
					filter: 'blur(3px) brightness(0.7)',
				},

				[theme.mediaQueries.wearableToTablet]: {
					filter: 'blur(2px) brightness(0.7)',
				},
			})}
			alt='background'
			loading='eager'
			quality={100}
			unoptimized
			priority
			width={1}
			height={1}
			placeholder={imageProps ? 'blur' : 'empty'}
			src={src}
			{...imageProps}
			{...rest}
		/>
	)
}
