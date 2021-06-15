import type { ComponentProps } from 'react'

export const CheckboxComponent = (props: ComponentProps<'input'>) => (
	<input
		css={{
			position: 'absolute',
			opacity: 0,
			flexShrink: 0,
		}}
		{...props}
	/>
)
