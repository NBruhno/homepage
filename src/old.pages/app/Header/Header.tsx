import type { ComponentPropsWithoutRef } from 'react'

import { useScrollStore } from 'states/page'

import { adjustHsl } from 'lib/client'

export const Header = (props: ComponentPropsWithoutRef<'header'>) => {
	const scrollY = useScrollStore((state) => state.scrollY)

	return (
		<header
			css={(theme) => ({
				alignItems: 'center',
				backdropFilter: 'saturate(150%) blur(5px)',
				backgroundColor: theme.isDarkTheme ? theme.color.input.backgroundHover : theme.color.sidebarBackground,
				boxShadow: !theme.isDarkTheme && scrollY > 10 ? '0 2px 8px rgba(0, 0, 0, 0.15)' : 'none',
				display: 'flex',
				height: '30px',
				padding: '12px',
				position: 'sticky',
				top: 0,
				transition: !theme.isDarkTheme && scrollY > 10 ? `box-shadow 300ms ${theme.animation.default}` : 'none',
				zIndex: 10,

				'@supports ((-webkit-backdrop-filter: blur(5px)) or (backdrop-filter: blur(5px)))': {
					backdropFilter: 'saturate(150%) blur(5px)',
					backgroundColor: adjustHsl(theme.isDarkTheme ? theme.color.input.backgroundHover : theme.color.sidebarBackground, { alpha: 0.9 }),
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
