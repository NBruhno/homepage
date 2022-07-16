import type { ComponentPropsWithoutRef } from 'react'

import { forwardRef } from 'react'

export const CheckboxComponent = forwardRef<HTMLInputElement, ComponentPropsWithoutRef<'input'>>((props, ref) => (
	<input
		css={{
			position: 'absolute',
			opacity: 0,
			flexShrink: 0,
		}}
		{...props}
		ref={ref}
	/>
))
