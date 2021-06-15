import type { ComponentProps } from 'react'

import { useResponsive } from 'states/responsive'

type Props = {
	noWrapper: boolean,
	show: boolean,
} & ComponentProps<'div'>

export const Container = ({ noWrapper, show, children, ...rest }: Props) => {
	const { collapsedSidebar } = useResponsive()

	return (
		<div
			css={(theme: Theme) => ({
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
				paddingLeft: collapsedSidebar ? '70px' : '250px',

				[theme.mediaQueries.maxMobile]: {
					paddingLeft: 0,
					transition: 'none',
				},
			})}
			{...rest}
		>
			{noWrapper ? children : (
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
