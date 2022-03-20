import type { ComponentPropsWithoutRef } from 'react'

export const Page = (props: ComponentPropsWithoutRef<'div'>) => (
	<div
		css={{
			padding: '24px',
			position: 'relative',
		}}
		{...props}
	/>
)
