import type { ComponentPropsWithoutRef } from 'react'

export const Placeholder = (props: ComponentPropsWithoutRef<'div'>) => (
	<div
		css={(theme) => ({
			borderRadius: '4px',
			height: '36px',
			padding: '0 12px',
			width: '88px',
			background: `linear-gradient(106.4deg, ${theme.color.gray} 0%, ${theme.color.gray} 49%, ${theme.color.sidebarBackground} 49.9%, ${theme.color.sidebarBackground} 100%);`,
		})}
		{...props}
	/>
)