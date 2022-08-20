import type { ComponentPropsWithoutRef } from 'react'

export const List = (props: ComponentPropsWithoutRef<'div'>) => (
	<div
		css={{
			display: 'flex',
			flexDirection: 'column',
			rowGap: '8px',
			minWidth: 0,
		}}
		{...props}
	/>
)
