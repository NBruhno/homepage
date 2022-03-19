import type { ComponentPropsWithoutRef } from 'react'

type Props = ComponentPropsWithoutRef<'div'> & {
	name?: string,
	gap?: number,
	rowGap?: number,
	columnGap?: number,
	shouldShow?: boolean,
}

export const GridContainer = ({ name, gap, rowGap, columnGap, shouldShow = true, ...rest }: Props) => {
	if (!shouldShow) return null

	return (
		<div
			css={{
				gridArea: name,

				gap: gap ? `${gap}px` : 'unset',
				rowGap: rowGap ? `${rowGap}px` : 'unset',
				columnGap: columnGap ? `${columnGap}px` : 'unset',
			}}
			{...rest}
		/>
	)
}
