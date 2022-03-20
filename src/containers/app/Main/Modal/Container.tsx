import type { ComponentPropsWithoutRef } from 'react'

import { useResponsive } from 'states/responsive'

type Props = ComponentPropsWithoutRef<'div'> & {
	hasNoWrapper: boolean,
	show: boolean,
}

export const Container = ({ hasNoWrapper, show, children, ...rest }: Props) => {
	const { isSidebarCollapsed } = useResponsive()

	return (
		<div
			css={(theme) => ({
				display: 'flex',
				left: 0,
				right: 0,
				top: 0,
				bottom: 0,
				opacity: show ? 1 : 0,
				pointerEvents: 'none',
				position: 'fixed',
				transition: `opacity 135ms ${theme.animation.default}, padding-left 300ms ${theme.animation.default}`,
				visibility: show ? 'visible' : 'hidden',
				zIndex: 5,
				margin: 0,
				paddingLeft: isSidebarCollapsed ? '70px' : '250px',

				[theme.mediaQueries.maxMobile]: {
					paddingLeft: 0,
					transition: 'none',
				},
			})}
			{...rest}
		>
			{hasNoWrapper ? children : (
				<div
					css={{
						display: 'flex',
						margin: 'auto',
						maxWidth: '100%',
						padding: '24px',
						pointerEvents: show ? 'auto' : 'none',
						visibility: show ? 'visible' : 'hidden',
						width: '450px',
					}}
				>
					{children}
				</div>
			)}
		</div>
	)
}
