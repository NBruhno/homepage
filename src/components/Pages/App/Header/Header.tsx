export const Header = (props: React.ComponentProps<'header'>) => (
	<header
		css={(theme: Theme) => ({
			height: '30px',
			padding: '12px',
			backgroundColor: theme.darkTheme ? theme.color.grayDark : theme.color.gray,
			color: theme.darkTheme ? theme.color.text : theme.color.textInverted,
			position: 'sticky',
			display: 'flex',
			alignItems: 'center',
			top: 0,
			zIndex: 5,

			'@media only screen and (min-width: 550px)': {
				display: 'none',
			},
		})}
		{...props}
	/>
)
