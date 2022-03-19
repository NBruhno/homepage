import type { ComponentPropsWithoutRef } from 'react'

export const RadioComponent = (props: ComponentPropsWithoutRef<'input'>) => (
	<input
		css={{
			position: 'absolute',
			opacity: 0,
			flexShrink: 0,
		}}
		{...props}
	/>
)
