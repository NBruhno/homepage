import type { ComponentPropsWithoutRef } from 'react'

type Props = ComponentPropsWithoutRef<'div'> & {
	width: number | string,
	height: number | string,
}

export const Placeholder = ({ height, width, ...rest }: Props) => (
	<div
		css={(theme) => ({
			flexShrink: 0,
			backgroundColor: theme.color.grayDark,
			height: `${height}px`,
			width: `${width}px`,
			marginTop: '12px',
		})}
		{...rest}
	/>
)
