import type { ComponentProps } from 'react'

export const Wrapper = (props: ComponentProps<'div'>) => (
	<div
		css={() => ({
			display: 'flex',
			textOverflow: 'ellipsis',
			justifyContent: 'space-around',
		})}
		{...props}
	/>
)
