import { transparentize } from 'polished'

type Props = {
	collapsed: boolean,
} & React.ComponentProps<'nav'>

export const Sidebar = ({ collapsed, ...rest }: Props) => (
	<nav
		css={(theme: Theme) => ({
			alignItems: 'stretch',
			backgroundColor: theme.color.background,
			borderRight: `1px solid ${theme.color.border}`,
			display: 'flex',
			flexDirection: 'column',
			height: '100vh',
			justifyContent: 'space-between',
			padding: '0',
			position: 'sticky',
			top: 0,
			transform: 'none',
			transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1), transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
			width: collapsed ? '70px' : '250px',
			zIndex: 10,

			'@supports ((-webkit-backdrop-filter: blur(8px)) or (backdrop-filter: blur(8px)))': {
				backgroundColor: transparentize(1, theme.color.background),
				backdropFilter: 'none',

				[theme.mediaQueries.maxMobile]: {
					backgroundColor: transparentize(0.2, theme.color.background),
					backdropFilter: 'saturate(150%) blur(5px)',
				},
			},

			'> ::-webkit-scrollbar': {
				width: collapsed ? 0 : '8px',
			},

			[theme.mediaQueries.maxMobile]: {
				width: collapsed ? 0 : '250px',
				transform: collapsed ? 'translate(-70px)' : 'none',
				height: 'calc(100vh - 54px)',
				position: 'fixed',
				top: '54px',
			},
		})}
		{...rest}
	/>
)
