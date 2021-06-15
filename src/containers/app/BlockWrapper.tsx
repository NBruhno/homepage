import type { ComponentProps } from 'react'

export const BlockWrapper = (props: ComponentProps<'div'>) => (
	<div
		css={{
			height: '100vh',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-around',
			margin: 'auto',
			fontSize: '42px',
			textAlign: 'center',
		}}
		{...props}
	/>
)
