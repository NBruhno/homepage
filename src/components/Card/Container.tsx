import type { ComponentPropsWithoutRef } from 'react'

export const Container = (props: ComponentPropsWithoutRef<'div'>) => (
	<div
		css={(theme) => ({
			backgroundColor: theme.color.background,
			border: `1px solid ${theme.color.gray020}`,
			borderRadius: '4px',
			margin: '8px 0',
			overflowWrap: 'break-word',
			transition: `height 135ms ${theme.animation.default}`,
			wordBreak: 'break-word',
		})}
		{...props}
	/>
)
