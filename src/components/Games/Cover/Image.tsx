type Props = {
	size: string,
} & React.ComponentProps<'img'>

export const Image = ({ size, ...rest }: Props) => (
	<img
		css={(theme: Theme) => ({
			backgroundColor: theme.color.grayDark,
			height: size === 'big' ? '352px' : '120px',
			width: size === 'big' ? '264px' : '90px',
		})}
		alt='game cover'
		{...rest}
	/>
)
