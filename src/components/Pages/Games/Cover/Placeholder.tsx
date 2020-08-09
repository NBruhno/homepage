export const Placeholder = ({ ...rest }: React.ComponentProps<'div'>) => (
	<div
		css={(theme: Theme) => ({
			flexShrink: 0,
			backgroundColor: theme.color.grayDark,
			height: '100%',
			width: '100%',
		})}
		{...rest}
	/>
)
