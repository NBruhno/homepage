export const Grid = (props: React.ComponentProps<'div'>) => (
	<div
		css={(theme: Theme) => ({
			display: 'grid',
			gridTemplateRows: '79px 1fr 79px',
			minHeight: '100vh',
			maxWidth: '100vw',
			backgroundColor: theme.color.background,
		})}
		{...props}
	/>
)
