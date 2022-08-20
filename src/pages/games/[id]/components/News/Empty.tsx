import type { ComponentPropsWithoutRef } from 'react'

export const Empty = (props: ComponentPropsWithoutRef<'span'>) => (
	<span
		css={(theme) => ({
			color: theme.color.textFaded,
			textAlign: 'center',
			marginTop: '24px',
		})}
		{...props}
	/>
)
