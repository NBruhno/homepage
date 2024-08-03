import NextImage from 'next/image'

type Props = {
	src: string,
	isPriority: boolean,
}

export const Image = ({ src, isPriority }: Props) => (
	<NextImage
		css={{
			height: '100%',
			width: '100%',
			aspectRatio: '264 / 353',
			objectFit: 'cover',
			color: 'transparent',
			borderRadius: '4px',

			// Prevent alt text from showing during image fetch
			'img:-moz-loading': {
				visibility: 'hidden',
			},
		}}
		alt='game cover'
		loading={isPriority ? 'eager' : 'lazy'}
		priority={isPriority}
		width={264}
		height={353}
		unoptimized
		src={src}
	/>
)
