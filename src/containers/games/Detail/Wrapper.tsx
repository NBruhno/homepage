import type { ComponentPropsWithoutRef } from 'react'

export const Wrapper = (props: ComponentPropsWithoutRef<'div'>) => (
	<div
		css={() => ({
			display: 'flex',
			textOverflow: 'ellipsis',
			justifyContent: 'space-around',
		})}
		{...props}
	/>
)
