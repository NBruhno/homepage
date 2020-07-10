export const Sidebar = (props: React.ComponentProps<'nav'>) => (
	<nav
		css={(theme: Theme) => ({
			height: '100%',
			padding: '12px 36px 12px 12px',
			backgroundColor: theme.color.background,
			borderRight: `1px solid ${theme.color.border}`,
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'start',
		})}
		{...props}
	/>
)
