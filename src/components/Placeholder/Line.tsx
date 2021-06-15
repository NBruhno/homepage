import type { ComponentProps } from 'react'

export const Line = (props: ComponentProps<'div'>) => (
	<span
		css={{
			display: 'block',
		}}
		{...props}
	/>
)
