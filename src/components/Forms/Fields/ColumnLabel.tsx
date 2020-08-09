export const ColumnLabel = (props: React.ComponentProps<'div'>) => (
	<div
		css={(theme: Theme) => ({
			display: 'block',
			fontFamily: theme.fontFamily.poppins,
			marginBottom: '25px',
		})}
		{...props}
	/>
)
