import type { ComponentPropsWithoutRef } from 'react'

export const Spacer = (props: ComponentPropsWithoutRef<'span'>) => (
	<span
		css={{
			position: 'absolute',
			height: '5px',
			top: 0,
			left: 0,
			right: 0,
		}}
		{...props}
	/>
)
