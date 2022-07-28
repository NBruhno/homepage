import type { ComponentPropsWithoutRef } from 'react'

export const Content = (props: ComponentPropsWithoutRef<'div'>) => (
	<div
		css={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'stretch',

			'&:first-of-type': {
				overflowX: 'hidden',
				overflowY: 'auto',
			},
		}}
		{...props}
	/>
)
