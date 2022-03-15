import type { ComponentProps } from 'react'

export const Wrapper = (props: ComponentProps<'div'>) => (
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
