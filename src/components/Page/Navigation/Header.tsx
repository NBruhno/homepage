export const Header = (props: React.ComponentProps<'nav'>) => (
	<nav
		css={(theme: Theme) => ({
			height: '55px',
			padding: '12px',
			backgroundColor: theme.color.grayDark,
			display: 'flex',
			alignItems: 'center',
			position: 'fixed',
			width: '100%',
			zIndex: 5,
		})}
		{...props}
	/>
)
