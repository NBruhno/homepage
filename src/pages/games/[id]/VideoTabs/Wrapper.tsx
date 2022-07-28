import type { ComponentPropsWithoutRef } from 'react'

export const Wrapper = (props: ComponentPropsWithoutRef<'div'>) => (
	<div
		css={(theme) => ({
			display: 'flex',
			border: `1px solid ${theme.color.border}`,
			borderRadius: '4px',
			marginRight: '-1px',
		})}
		{...props}
	/>
)
