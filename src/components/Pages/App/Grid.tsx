export const Grid = (props: React.ComponentProps<'div'>) => (
	<div
		css={(theme: Theme) => ({
			display: 'grid',
			gridTemplateRows: '1fr',
			gridTemplateColumns: 'auto 1fr',
			minHeight: '100vh',
			maxWidth: '100vw',
			backgroundColor: theme.color.background,

			'@media only screen and (max-width: 550px)': {
				gridTemplateRows: 'auto 1fr',
				gridTemplateColumns: '1fr',
			},
		})}
		{...props}
	/>
)
