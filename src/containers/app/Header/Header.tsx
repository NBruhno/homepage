import { transparentize } from 'polished'

export const Header = (props: React.ComponentProps<'header'>) => (
	<header
		css={(theme: Theme) => ({
			alignItems: 'center',
			backdropFilter: 'saturate(150%) blur(5px)',
			backgroundColor: transparentize(0.1, theme.darkTheme ? theme.color.grayDark : theme.color.gray),
			color: theme.darkTheme ? theme.color.text : theme.color.textInverted,
			display: 'flex',
			height: '30px',
			padding: '12px',
			position: 'sticky',
			top: 0,
			zIndex: 5,

			[theme.mediaQueries.minMobile]: {
				display: 'none',
			},
		})}
		{...props}
	/>
)
