import type { ComponentProps } from 'react'

export const Muted = (props: ComponentProps<'div'>) => (
	<div
		css={(theme) => ({
			color: theme.color.text,
			fontSize: theme.font.size.s90,
			opacity: 0.7,
			textAlign: 'center',
			lineHeight: '32px',
			borderTop: `1px solid ${theme.color.gray020}`,
			height: '32px',
		})}
		{...props}
	/>
)
