import { useResponsive } from 'states/responsive'

export const Shade = (props: React.ComponentProps<'div'>) => {
	const { collapsedSidebar, updateResponsive } = useResponsive()
	return (
		<div
			onClick={() => updateResponsive({ collapsedSidebar: true })}
			css={(theme: Theme) => ({
				backgroundColor: theme.color.black,
				bottom: 0,
				left: 0,
				right: 0,
				top: 0,
				opacity: 0,
				pointerEvents: 'none',
				position: 'absolute',
				zIndex: 9,
				visibility: 'hidden',

				[theme.mediaQueries.maxMobile]: {
					opacity: !collapsedSidebar ? 0.4 : 0,
					visibility: collapsedSidebar ? 'hidden' : 'visible',
					transition: collapsedSidebar ? 'none' : `opacity 300ms ${theme.animation.default}`,
					pointerEvents: collapsedSidebar ? 'none' : 'auto',
				},
			})}
			aria-hidden='true'
			{...props}
		/>
	)
}
