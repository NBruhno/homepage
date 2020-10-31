type Props = {
	width: string | number,
	height: string | number,
} & React.ComponentProps<'div'>

export const Placeholder = ({ height, width, ...rest }: Props) => (
	<div
		css={(theme: Theme) => ({
			flexShrink: 0,
			backgroundColor: theme.color.grayDark,
			height: `${height}px`,
			width: `${width}px`,
			marginTop: '12px',
		})}
		{...rest}
	/>
)
