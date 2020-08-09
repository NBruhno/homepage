type Props = {
	loading?: string,
} & React.ComponentProps<'img'>

export const Image = ({ loading = 'lazy', ...rest }: Props) => (
	<img
		css={{
			height: '100%',
			objectFit: 'cover',
		}}
		alt='game cover'
		loading={loading}
		{...rest}
	/>
)
