type Props = {
	isMobile: boolean,
	quality: 'high' | 'medium' | 'low',
} & React.ComponentProps<'img'>

export const Background = ({ quality, isMobile, ...rest }: Props) => (
	<img
		css={{
			width: '100%',
			height: '100%',
			filter: `blur(0) brightness(${isMobile ? 0.4 : 0.7})`,
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
		}}
		alt='background'
		{...rest}
	/>
)
