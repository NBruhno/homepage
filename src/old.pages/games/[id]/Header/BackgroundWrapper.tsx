import type { ComponentPropsWithoutRef } from 'react'

export const BackgroundWrapper = (props: ComponentPropsWithoutRef<'div'>) => (
	<div
		css={(theme) => ({
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
			width: '100%',
			zIndex: 0,
			overflow: 'hidden',
			backgroundColor: theme.color.background,
			maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 500px, rgba(0,0,0,0))',
		})}
		{...props}
	/>
)
