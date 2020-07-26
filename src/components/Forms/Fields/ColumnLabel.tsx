export const ColumnLabel = (props: React.ComponentProps<'div'>) => (
	<div
		css={(theme: Theme) => ({
			marginBottom: '25px',
			display: 'block',
			fontFamily: theme.fontFamily.poppins,
		})}
		{...props}
	/>
)
