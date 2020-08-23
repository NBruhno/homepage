import { useTheme } from 'emotion-theming'
import { transparentize } from 'polished'
import { css } from '@emotion/core'

type Props = {
	collapsed?: boolean,
} & React.ComponentProps<'nav'>

const defaultCss = (theme: Theme, collapsed: boolean) => css({
	alignItems: 'stretch',
	backgroundColor: theme.color.background,
	borderRight: `1px solid ${theme.color.border}`,
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',
	padding: '0',
	zIndex: 10,

	'> ::-webkit-scrollbar': {
		width: collapsed ? 0 : '8px',
	},
})

export const DesktopSidebar = ({ collapsed, ...rest }: Props) => {
	const theme = useTheme<Theme>()

	return (
		<nav
			css={[
				defaultCss(theme, collapsed),
				{
					height: '100vh',
					position: 'sticky',
					top: 0,
					transform: 'none',
					transition: `width 300ms ${theme.animation.default}`,
					width: collapsed ? '70px' : '250px',

					'@supports ((-webkit-backdrop-filter: blur(8px)) or (backdrop-filter: blur(8px)))': {
						backdropFilter: 'none',
						backgroundColor: transparentize(1, theme.color.background),
					},
				},
			]}
			{...rest}
		/>
	)
}

export const MobileSidebar = ({ show, ...rest }: Props & { show: boolean }) => {
	const theme = useTheme<Theme>()

	return (
		<nav
			css={[
				defaultCss(theme, !show),
				{
					height: 'calc(100vh - 53px)',
					position: 'fixed',
					top: '54px',
					opacity: show ? 1 : 0,
					visibility: show ? 'visible' : 'hidden',
					transform: show ? 'none' : 'translate(-251px)',
					transition: `transform 300ms ${theme.animation.default}`,
					width: '250px',

					'@supports ((-webkit-backdrop-filter: blur(8px)) or (backdrop-filter: blur(8px)))': {
						backdropFilter: 'saturate(150%) blur(5px)',
						backgroundColor: transparentize(0.2, theme.color.background),
					},
				},
			]}
			{...rest}
		/>
	)
}
