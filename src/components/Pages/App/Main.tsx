export const Main = (props: React.ComponentProps<'main'>) => (
	<main
		css={(theme: Theme) => ({
			padding: '24px',
			color: theme.color.text,
			position: 'relative',
		})}
		{...props}
	/>
)
