import { useResponsive } from 'states/responsive'

export const Shade = (props: React.ComponentProps<'div'>) => {
	const { showMenu, updateResponsive } = useResponsive()
	return (
		<div
			onClick={() => updateResponsive({ showMenu: false })}
			css={(theme: Theme) => ({
				backgroundColor: theme.color.black,
				bottom: 0,
				left: 0,
				right: 0,
				top: '54px',
				opacity: 0,
				pointerEvents: 'none',
				position: 'fixed',
				zIndex: 9,
				visibility: 'hidden',

				[theme.mediaQueries.maxMobile]: {
					opacity: showMenu ? 0.4 : 0,
					visibility: showMenu ? 'visible' : 'hidden',
					transition: showMenu ? `opacity 300ms ${theme.animation.default}` : 'none',
					pointerEvents: showMenu ? 'auto' : 'none',
				},
			})}
			aria-hidden='true'
			{...props}
		/>
	)
}
