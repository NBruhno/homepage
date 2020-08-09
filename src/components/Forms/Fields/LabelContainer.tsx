export const LabelContainer = (props: React.ComponentProps<'div'>) => (
	<div
		css={(theme: Theme) => ({
			color: theme.color.textFaded,
			display: 'flex',
			flexDirection: 'column',
			fontSize: theme.fontSize.s100,
			fontWeight: 400,
			marginBottom: '6px',
		})}
		{...props}
	/>
)
