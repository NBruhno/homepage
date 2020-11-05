import { keyframes } from '@emotion/core'

const fadeIn = keyframes`
	0% {
		opacity: 0;
	}

	100% {
		opacity: 1;
	}
`

export const Container = (props: React.ComponentProps<'div'>) => (
	<div
		css={(theme: Theme) => ({
			animation: `350ms ${theme.animation.default} ${fadeIn} 1`,
		})}
		{...props}
	/>
)
