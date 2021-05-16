import { css } from '@emotion/react'
import { transparentize } from 'polished'

type Props = {
	collapsed?: boolean,
} & React.ComponentProps<'nav'>

const defaultCss = (theme: Theme, collapsed: boolean) => css({
	alignItems: 'stretch',
	backgroundColor: theme.color.sidebarBackground,
	flexDirection: 'column',
	justifyContent: 'space-between',
	padding: '0',
	opacity: 0,
	visibility: 'hidden',
	zIndex: 10,
	display: 'none',

	'> ::-webkit-scrollbar': {
		width: collapsed ? 0 : '8px',
	},
})

export const DesktopSidebar = ({ collapsed = false, ...rest }: Props) => (
	<nav
		css={(theme: Theme) => ([
			defaultCss(theme, collapsed),
			{
				[theme.mediaQueries.minMobile]: {
					display: 'flex',
					height: '100vh',
					opacity: 1,
					position: 'sticky',
					top: 0,
					transition: `width 300ms ${theme.animation.default}`,
					visibility: 'visible',
					width: collapsed ? '70px' : '250px',
				},
			},
		])}
		{...rest}
	/>
)

export const MobileSidebar = ({ show, ...rest }: Props & { show: boolean }) => (
	<nav
		css={(theme: Theme) => ([
			defaultCss(theme, !show),
			{
				[theme.mediaQueries.maxMobile]: {
					display: 'flex',
					height: 'calc(100vh - 53px)',
					opacity: 1,
					position: 'fixed',
					top: '54px',
					transform: show ? 'none' : 'translate(-251px)',
					transition: `transform 300ms ${theme.animation.default}`,
					visibility: 'visible',
					width: '250px',

					'@supports ((-webkit-backdrop-filter: blur(5px)) or (backdrop-filter: blur(5px)))': {
						backdropFilter: 'saturate(150%) blur(5px)',
						backgroundColor: transparentize(0.1, theme.color.sidebarBackground),
					},
				},
			},
		])}
		{...rest}
	/>
)
