import type { ComponentProps } from 'react'

export const Text = (props: ComponentProps<'span'>) => (
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
