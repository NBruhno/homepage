import type { ComponentProps } from 'react'

export const InputButtonContainer = (props: ComponentProps<'div'>) => (
	<div
		css={() => ({
			display: 'flex',
			alignItem: 'center',
			pointerEvents: 'none',
			margin: '-10px -6px',
		})}
		{...props}
	/>
)
