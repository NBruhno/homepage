import type { GameImagePlaceholder } from 'types'

import NextImage from 'next/image'

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
				minWidth: 'calc(100% + 25px)',
				minHeight: '1000px',
				height: 'calc(100% + 500px)',
				maxHeight: '100vh',
				filter: 'blur(6px) brightness(0.8)',
				background: [theme.color.inputBackgroundHover, `linear-gradient(134deg, ${theme.color.inputBorder} 0%, ${theme.color.inputBackgroundHover} 63%, ${theme.color.inputBackground} 100%)`],
				objectFit: 'cover',
				objectPosition: 'center',
				margin: '-15px',
				overflow: 'none',

				[theme.mediaQueries.tabletToDesktop]: {
					filter: 'blur(3px) brightness(0.8)',
				},

				[theme.mediaQueries.wearableToTablet]: {
					filter: 'blur(2px) brightness(0.8)',
				},

				[theme.mediaQueries.maxMobile]: {
					minHeight: '600px',
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
