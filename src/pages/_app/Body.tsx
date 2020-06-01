export const Body = (props: React.ComponentProps<'body'>) => (
	<body
		css={(theme: Theme) => ({
			backgroundColor: theme.color.background,
			color: theme.color.text,
		})}
		{...props}
	/>
)
