import type { ComponentPropsWithoutRef } from 'react'

type Props = ComponentPropsWithoutRef<'div'> & {
	rowIndex: number,
}

export const GamesRow = ({ rowIndex, ...rest }: Props) => (
	<div
		css={{
			top: `calc(200px * ${rowIndex})`,
			position: 'relative',
			display: 'flex',
			height: '150px',
		}}
		{...rest}
	/>
)
