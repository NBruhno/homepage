type Props = {
	size: string,
} & React.ComponentProps<'div'>

export const Placeholder = ({ size, ...rest }: Props) => (
	<div
		css={(theme: Theme) => ({
			backgroundColor: theme.color.grayDark,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-around',
			height: size === 'big' ? '352px' : '120px',
			width: size === 'big' ? '264px' : '90px',
		})}
		{...rest}
	/>
)
