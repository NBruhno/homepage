type Props = {
	src: string,
	quality: 'high' | 'medium' | 'low',
} & React.ComponentProps<'img'>

const placeholderImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAUAAarVyFEAAAAASUVORK5CYII='

export const Background = ({ quality, src, ...rest }: Props) => (
	<img
		css={(theme: Theme) => ({
			width: '100%',
			height: '100%',
			filter: 'blur(0) brightness(0.7)',
			backgroundColor: 'transparent',
			objectFit: 'cover',

			'@media(min-width: 2600px)': {
				filter: 'blur(5px) brightness(0.7)',
			},

			'@media(min-width: 1550px)': {
				filter: (quality === 'low' || quality === 'medium') && 'blur(5px) brightness(0.7)',
			},

			'@media(min-width: 1250px)': {
				filter: quality === 'low' && 'blur(5px) brightness(0.7)',
			},

			[theme.mediaQueries.maxMobile]: {
				filter: 'none',
			},
		})}
		alt='background'
		loading='eager'
		src={src ?? placeholderImage}
		{...rest}
	/>
)
