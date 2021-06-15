import type { ComponentProps } from 'react'

export const MainContent = (props: ComponentProps<'div'>) => (
	<div
		css={(theme: Theme) => ({
			margin: '272px auto 0',
			zIndex: 1,
			width: '100%',
			maxWidth: '1300px',
			transition: `width 300ms ${theme.animation.default}`,

			[theme.mediaQueries.maxMobile]: {
				margin: '86px auto 0',
			},
		})}
		{...props}
	/>
)
