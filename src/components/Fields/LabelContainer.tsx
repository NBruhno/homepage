export const LabelContainer = (props: React.ComponentProps<'div'>) => (
	<div
		css={(theme: Theme) => ({
			display: 'flex',
			flexDirection: 'column',
			color: theme.color.text,
			fontSize: theme.fontSize.large,
			fontWeight: 400,
			marginBottom: '4px',
		})}
		{...props}
	/>
)
