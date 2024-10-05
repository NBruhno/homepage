import type { ComponentPropsWithoutRef } from 'react'

import { useResponsive } from 'states/page'

export const Shade = (props: ComponentPropsWithoutRef<'div'>) => {
	const { showMenu, setResponsiveState } = useResponsive()
	return (
		<div
			onClick={() => setResponsiveState({ showMenu: false })}
			css={(theme) => ({
				backgroundColor: theme.color.black,
				bottom: 0,
				left: 0,
				right: 0,
				top: '54px',
				opacity: 0,
				pointerEvents: 'none',
				position: 'fixed',
				zIndex: 9,
				display: 'none',

				[theme.mediaQueries.maxMobile]: {
					display: 'inline',
					visibility: showMenu ? 'visible' : 'hidden',
					opacity: showMenu ? 0.4 : 0,
					transition: `opacity 300ms ${theme.animation.default}`,
					pointerEvents: showMenu ? 'auto' : 'none',
				},
			})}
			aria-hidden='true'
			{...props}
		/>
	)
}
