import type { ComponentPropsWithoutRef } from 'react'

export const Text = (props: ComponentPropsWithoutRef<'span'>) => (
	<span
		css={{
			overflow: 'hidden',
			textOverflow: 'clip',
			whiteSpace: 'nowrap',
			color: 'currentColor',
		}}
		{...props}
	/>
)
