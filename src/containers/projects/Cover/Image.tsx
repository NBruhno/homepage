type Props = {
	loading?: string,
} & React.ComponentProps<'img'>

export const Image = ({ loading = 'lazy', ...rest }: Props) => (
	<img
		css={{
			height: '100%',
			width: '100%',
			objectFit: 'cover',

			// Prevent alt text from showing during image fetch
			'img:-moz-loading': {
				visibility: 'hidden',
			},
		}}
		alt='project cover'
		loading={loading}
		{...rest}
	/>
)
