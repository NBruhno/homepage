import type { ComponentProps } from 'react'

import { adjustHsl } from 'lib/adjustHsl'
import { useScroll } from 'lib/useScroll'

export const Header = (props: ComponentProps<'header'>) => {
	const { scrollY } = useScroll()

	return (
		<header
			css={(theme: Theme) => ({
				alignItems: 'center',
				backdropFilter: 'saturate(150%) blur(5px)',
				backgroundColor: theme.darkTheme ? theme.color.inputBackgroundHover : theme.color.sidebarBackground,
				boxShadow: !theme.darkTheme && scrollY > 10 ? '0 2px 8px rgba(0, 0, 0, 0.15)' : 'none',
				display: 'flex',
				height: '30px',
				padding: '12px',
				position: 'sticky',
				top: 0,
				transition: !theme.darkTheme && scrollY > 10 ? `box-shadow 300ms ${theme.animation.default}` : 'none',
				zIndex: 10,

				'@supports ((-webkit-backdrop-filter: blur(5px)) or (backdrop-filter: blur(5px)))': {
					backdropFilter: 'saturate(150%) blur(5px)',
					backgroundColor: adjustHsl(theme.darkTheme ? theme.color.inputBackgroundHover : theme.color.sidebarBackground, { alpha: 0.9 }),
				},

				[theme.mediaQueries.minMobile]: {
					display: 'none',
					visibility: 'hidden',
				},
			})}
			{...props}
		/>
	)
}
