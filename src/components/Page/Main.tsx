export const Main = (props: React.ComponentProps<'main'>) => (
	<main
		css={(theme: Theme) => ({
			backgroundColor: theme.color.background,
			color: theme.color.text,
			height: '100%',

			fontSize: '2re',
		})}
		{...props}
	/>
)
