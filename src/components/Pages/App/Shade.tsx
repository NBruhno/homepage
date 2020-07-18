import { useStore } from 'lib/store'

export const Shade = (props: React.ComponentProps<'div'>) => {
	const { state: { responsive }, dispatch } = useStore()
	return (
		<div
			onClick={() => dispatch({ responsive: { ...responsive, collapsedSidebar: true } })}
			css={(theme: Theme) => ({
				backgroundColor: theme.color.black,
				bottom: 0,
				display: 'static',
				left: 0,
				opacity: (responsive.isMobile && !responsive.collapsedSidebar) ? 0.2 : 0,
				pointerEvents: (responsive.isMobile && !responsive.collapsedSidebar) ? 'auto' : 'none',
				position: 'absolute',
				right: 0,
				top: 0,
				transition: 'opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)',
				zIndex: 4,
			})}
			aria-hidden='true'
			{...props}
		/>
	)
}
