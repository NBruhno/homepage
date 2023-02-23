import type { ComponentPropsWithoutRef } from 'react'

export const Wrapper = (props: ComponentPropsWithoutRef<'div'>) => (
	<div
		css={{
			display: 'flex',
			borderRadius: '4px',
			marginRight: '-1px',
		}}
		{...props}
	/>
)
