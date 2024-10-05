import type { ComponentPropsWithoutRef } from 'react'

export const Empty = (props: ComponentPropsWithoutRef<'span'>) => (
	<span
		css={(theme) => ({
			color: theme.color.textFaded,
			textAlign: 'center',
			margin: '24px 0',
		})}
		{...props}
	/>
)
