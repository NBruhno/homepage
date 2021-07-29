import type { ComponentProps } from 'react'

type Props = {
	maxWidth?: number,
} & ComponentProps<'div'>

export const PageContent = ({ maxWidth = 700, ...rest }: Props) => (
	<div
		css={{
			maxWidth: `${maxWidth}px`,
			margin: '0 auto',
		}}
		{...rest}
	/>
)
