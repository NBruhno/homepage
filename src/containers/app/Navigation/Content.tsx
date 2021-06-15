import type { ComponentProps } from 'react'

export const Content = (props: ComponentProps<'div'>) => (
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
