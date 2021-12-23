import type { ComponentProps } from 'react'

type Props = ComponentProps<'div'> & {
	isVisible: boolean,
}

export const LoaderWrapper = ({ isVisible, ...rest }: Props) => (
	<div
		css={{
			left: '50%',
			opacity: isVisible ? 1 : 0,
			position: 'absolute',
			top: '50%',
			transform: 'translate(-50%, -50%)',
			transition: 'opacity 0.4s',
		}}
		{...rest}
	/>
)
