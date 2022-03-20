import type { ComponentPropsWithoutRef } from 'react'

export const CheckboxComponent = (props: ComponentPropsWithoutRef<'input'>) => (
	<input
		css={{
			position: 'absolute',
			opacity: 0,
			flexShrink: 0,
		}}
		{...props}
	/>
)
