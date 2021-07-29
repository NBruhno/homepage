import type { ComponentProps } from 'react'

import { keyframes } from '@emotion/react'

const fadeIn = keyframes`
	0% {
		opacity: 0;
	}

	100% {
		opacity: 1;
	}
`

export const Container = (props: ComponentProps<'div'>) => (
	<div
		css={(theme) => ({
			animation: `350ms ${theme.animation.default} ${fadeIn} 1`,
		})}
		{...props}
	/>
)
