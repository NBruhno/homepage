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
			height: size === 'big' ? '352px' : '160px',
			width: size === 'big' ? '264px' : '111px',

			[theme.mediaQueries.maxMobile]: {
				height: '160px',
				width: '111px',
			},
		})}
		{...rest}
	/>
)
