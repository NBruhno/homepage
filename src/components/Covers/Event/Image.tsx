import NextImage from 'next/image'

type Props = {
	src: string,
}

export const Image = ({ src, ...rest }: Props) => (
	<NextImage
		css={(theme) => ({
			height: '100%',
			width: '100%',
			objectFit: 'cover',
			color: 'transparent',
			margin: '0',
			borderRadius: '8px',
			aspectRatio: '16 / 9',

			// Prevent alt text from showing during image fetch
			'img:-moz-loading': {
				visibility: 'hidden',
			},

			[theme.mediaQueries.maxMobile]: {
				width: '100%',
				maxWidth: 'unset',
				height: 'auto',
				maxHeight: 'unset',
			},
		})}
		alt='game event logo'
		loading='eager'
		priority
		width={1920}
		height={1080}
		unoptimized
		src={src}
		{...rest}
	/>
)
