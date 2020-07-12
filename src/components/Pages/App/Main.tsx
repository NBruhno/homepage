export const Main = (props: React.ComponentProps<'main'>) => (
	<main
		css={(theme: Theme) => ({
			color: theme.color.text,
			position: 'relative',
			display: 'grid',
			grid: '1fr auto / 1fr',
		})}
		{...props}
	/>
)
