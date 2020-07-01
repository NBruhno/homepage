export const Main = (props: React.ComponentProps<'main'>) => (
	<main
		css={(theme: Theme) => ({
			padding: '24px',
			backgroundColor: theme.color.background,
			color: theme.color.text,
			maxWidth: '100vw',
		})}
		{...props}
	/>
)
