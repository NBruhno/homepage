import type { ComponentPropsWithoutRef } from 'react'

type Props = ComponentPropsWithoutRef<'div'>

export const Wrapper = (props: Props) => (
	<div
		css={{
			height: 'calc(100vh + 310px)',
			width: 'calc(100vw + 600px)',
			margin: '-15vw -300px 0',
			filter: 'blur(4px) brightness(0.8)',
			transform: 'rotate(15deg)',
			position: 'relative',
		}}
		{...props}
	/>
)
