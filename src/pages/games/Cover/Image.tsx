import type { GameImagePlaceholder } from 'types'

import NextImage from 'next/image'

type Props = {
	src: string,
	imageProps: GameImagePlaceholder | undefined,
	isPriority: boolean,
}

export const Image = ({ src, imageProps, isPriority }: Props) => (
	<NextImage
		css={{
			height: '100%',
			width: '100%',
			aspectRatio: '3/4',
			objectFit: 'cover',
			color: 'transparent',
			position: 'relative',

			// Prevent alt text from showing during image fetch
			'img:-moz-loading': {
				visibility: 'hidden',
			},
		}}
		alt='game cover'
		loading={isPriority ? 'eager' : 'lazy'}
		priority={isPriority}
		width={264}
		height={352}
		placeholder={imageProps?.blurDataURL ? 'blur' : 'empty'}
		unoptimized
		src={src}
		{...imageProps}
	/>
)
