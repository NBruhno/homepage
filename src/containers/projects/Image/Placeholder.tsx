export const Placeholder = ({ ...rest }: React.ComponentProps<'div'>) => (
	<div
		css={(theme: Theme) => ({
			flexShrink: 0,
			backgroundColor: theme.color.grayDark,
			height: '475px',
			width: '100%',
			marginTop: '12px',
		})}
		{...rest}
	/>
)
