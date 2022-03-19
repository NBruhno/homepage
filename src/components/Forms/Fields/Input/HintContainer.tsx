import type { ComponentPropsWithoutRef } from 'react'

export const HintContainer = (props: ComponentPropsWithoutRef<'div'>) => (
	<div
		css={{
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'flex-end',
		}}
		{...props}
	/>
)
