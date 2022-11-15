import type { ComponentPropsWithoutRef } from 'react'

export const Container = (props: ComponentPropsWithoutRef<'span'>) => (
	<span
		css={{
			display: 'inline-block',
			height: '12px',
			position: 'relative',
			width: '22px',
		}}
		{...props}
	/>
)
