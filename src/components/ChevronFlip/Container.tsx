import type { ComponentPropsWithoutRef } from 'react'

export const Container = (props: ComponentPropsWithoutRef<'span'>) => (
	<span
		css={{
			display: 'inline-block',
			height: '1em',
			position: 'relative',
			width: '1.4em',
		}}
		{...props}
	/>
)
