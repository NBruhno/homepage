type Props = {
	ratingLevel: 'high' | 'normal' | 'low' | null,
} & React.ComponentProps<'div'>

export const Container = ({ ratingLevel, ...rest }: Props) => (
	<div
		css={(theme: Theme) => ({
			alignItems: 'center',
			background: (() => {
				switch (ratingLevel) {
					case 'high': return `linear-gradient(106.4deg, ${theme.color.success} 0%, ${theme.color.success} 49%, ${theme.color.sidebarBackground} 49.9%, ${theme.color.sidebarBackground} 100%);`
					case 'normal': return `linear-gradient(106.4deg, ${theme.color.link} 0%, ${theme.color.link} 49%, ${theme.color.sidebarBackground} 49.9%, ${theme.color.sidebarBackground} 100%);`
					case 'low': return `linear-gradient(106.4deg, ${theme.color.error} 0%, ${theme.color.error} 49%, ${theme.color.sidebarBackground} 49.9%, ${theme.color.sidebarBackground} 100%);`
					case null: return theme.color.sidebarBackground
				}
			})(),
			color: theme.darkTheme ? theme.color.text : theme.color.textInverted,
			borderRadius: '4px',
			display: 'flex',
			fontFamily: theme.fontFamily.poppins,
			height: '36px',
			justifyContent: 'space-between',
			maxWidth: '88px',

			'> div': {
				textAlign: 'center',
				width: '21px',

				'&:first-child': {
					paddingLeft: '12px',
				},

				'&:last-child': {
					paddingRight: '12px',
				},
			},
		})}
		{...rest}
	/>
)
