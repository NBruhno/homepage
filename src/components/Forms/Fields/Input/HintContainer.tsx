import type { ComponentProps } from 'react'

export const HintContainer = (props: ComponentProps<'div'>) => (
	<div
		css={{
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'flex-end',
		}}
		{...props}
	/>
)
