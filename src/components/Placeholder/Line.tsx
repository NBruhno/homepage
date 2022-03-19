import type { ComponentPropsWithoutRef } from 'react'

export const Line = (props: ComponentPropsWithoutRef<'div'>) => (
	<span
		css={{
			display: 'block',
		}}
		{...props}
	/>
)
