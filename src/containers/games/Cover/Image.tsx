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

			// Prevent alt text from showing during image fetch
			'img:-moz-loading': {
				visibility: 'hidden',
			},
		}}
		alt='game cover'
		loading={isPriority ? 'eager' : 'lazy'}
		priority={isPriority}
		layout='responsive'
		width={264}
		height={352}
		placeholder={imageProps ? 'blur' : 'empty'}
		unoptimized
		{...imageProps}
		src={src}
	/>
)
