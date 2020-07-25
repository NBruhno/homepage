type Props = {
	size: string,
} & React.ComponentProps<'div'>

export const Placeholder = ({ size, ...rest }: Props) => (
	<div
		css={(theme: Theme) => ({
			flexShrink: 0,
			backgroundColor: theme.color.grayDark,
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
