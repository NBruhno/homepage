type Props = {
	loading?: string,
} & React.ComponentProps<'img'>

export const Image = ({ loading = 'lazy', title, ...rest }: Props) => (
	<img
		css={{
			height: '100%',
			objectFit: 'cover',
			width: '100%',
			marginTop: '12px',
		}}
		alt={title}
		loading={loading}
		{...rest}
	/>
)
