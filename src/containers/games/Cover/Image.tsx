import NextImage from 'next/image'

type Props = {
	loading?: 'eager' | 'lazy',
	src: string,
	imageProps: any,
}

export const Image = ({ loading = 'lazy', src, imageProps }: Props) => (
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
		loading={loading}
		layout='responsive'
		width={264}
		height={352}
		placeholder={imageProps ? 'blur' : 'empty'}
		{...imageProps}
		src={src}
	/>
)
