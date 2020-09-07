type Props = {
	loading?: string,
} & React.ComponentProps<'img'>

export const Image = ({ loading = 'lazy', title, ...rest }: Props) => (
	<img
		css={{
			cursor: 'zoom-in',
			height: '100%',
			objectFit: 'contain',
			width: '100%',
		}}
		alt={title}
		loading={loading}
		{...rest}
	/>
)
