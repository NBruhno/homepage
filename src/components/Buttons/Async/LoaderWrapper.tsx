import type { ComponentPropsWithoutRef } from 'react'

type Props = ComponentPropsWithoutRef<'div'> & {
	showPlaceholder: boolean,
}

export const LoaderWrapper = ({ showPlaceholder, ...rest }: Props) => (
	<div
		css={(theme) => ({
			left: '50%',
			opacity: showPlaceholder ? 1 : 0,
			position: 'absolute',
			top: '50%',
			transform: 'translate(-50%, -50%)',
			transition: `opacity 0.2s ${theme.animation.default}`,
		})}
		{...rest}
	/>
)
