export const Header = (props: React.ComponentProps<'header'>) => (
	<header
		css={(theme: Theme) => ({
			height: '55px',
			padding: '12px',
			backgroundColor: theme.color.grayDark,
			color: theme.color.text,
			display: 'flex',
			alignItems: 'center',
		})}
		{...props}
	/>
)
