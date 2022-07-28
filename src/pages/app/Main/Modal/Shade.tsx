import type { ComponentPropsWithoutRef } from 'react'

import { adjustHsl } from 'lib/client'

type Props = ComponentPropsWithoutRef<'div'> & {
	show?: boolean,
}

export const Shade = ({ show, ...rest }: Props) => (
	<div
		css={(theme) => ({
			backgroundColor: show ? adjustHsl(theme.color.background, { alpha: 0.5 }) : 'unset',
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			zIndex: 4,
			pointerEvents: show ? 'auto' : 'none',
			visibility: show ? 'visible' : 'hidden',
			transition: `background-color 135ms ${theme.animation.default}`,

			'@supports ((-webkit-backdrop-filter: blur(8px)) or (backdrop-filter: blur(8px)))': {
				backdropFilter: show ? 'blur(5px)' : 'none',
				backgroundColor: show ? adjustHsl(theme.color.background, { alpha: 0.5 }) : 'unset',
			},
		})}
		{...rest}
	/>
)
