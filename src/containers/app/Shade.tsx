import { useStore } from 'lib/store'

export const Shade = (props: React.ComponentProps<'div'>) => {
	const { state: { responsive }, dispatch } = useStore()
	return (
		<div
			onClick={() => dispatch({ responsive: { ...responsive, collapsedSidebar: true } })}
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

				[theme.mediaQueries.maxMobile]: {
					opacity: responsive.collapsedSidebar ? 0 : 0.4,
					pointerEvents: responsive.collapsedSidebar ? 'none' : 'auto',
				},
			})}
			aria-hidden='true'
			{...props}
		/>
	)
}
