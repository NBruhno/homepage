import { css } from '@emotion/core'

type IconTypes = {
	x?: number,
	y?: number,
	size: number,
	children: React.ReactNode,
}

const Svg = ({ size = 24, x = 24, y = x, children, ...props }: IconTypes) => (
	<svg
		viewBox={`0 0 ${x} ${y}`}
		preserveAspectRatio='xMinYMin meet'
		css={css`
			fill: currentColor;
			width: ${size}px;
			height: ${size}px;
		`}
		{...props}
	>
		{children}
	</svg>
)

export const AlertCircleIcon = (props) => (
	<Svg {...props}>
		<path fill='currentColor' d='M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z' />
	</Svg>
)

export const WindowCloseIcon = (props) => (
	<Svg {...props}>
		<path fill='currentColor' d='M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z' />
	</Svg>
)
