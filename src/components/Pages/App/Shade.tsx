import { useStore } from 'lib/store'

export const Shade = (props: React.ComponentProps<'div'>) => {
	const { state: { responsive }, dispatch } = useStore()
	return (
		<div
			onClick={() => dispatch({ responsive: { ...responsive, collapsedSidebar: true } })}
			css={(theme: Theme) => ({
				position: 'absolute',
				top: 0,
				bottom: 0,
				left: 0,
				right: 0,
				backgroundColor: theme.color.black,
				display: (responsive.isMobile && !responsive.collapsedSidebar) ? 'static' : 'none',
				opacity: (responsive.isMobile && !responsive.collapsedSidebar) ? 0.4 : 0,
				zIndex: 4,
			})}
			aria-hidden='true'
			{...props}
		/>
	)
}
