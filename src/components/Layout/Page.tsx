import type { ComponentProps } from 'react'

export const Page = (props: ComponentProps<'div'>) => (
	<div
		css={{
			padding: '24px',
			position: 'relative',
		}}
		{...props}
	/>
)
