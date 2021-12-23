import type { ComponentProps } from 'react'

type Props = ComponentProps<'div'> & {
	maxWidth?: number,
}

export const PageContent = ({ maxWidth = 700, ...rest }: Props) => (
	<div
		css={{
			maxWidth: `${maxWidth}px`,
			margin: '0 auto',
		}}
		{...rest}
	/>
)
