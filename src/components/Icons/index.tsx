import { mdiAlertCircle, mdiWindowClose, mdiThemeLightDark } from '@mdi/js'

type Props = {
	x?: number,
	y?: number,
	size?: number,
	children?: React.ReactNode,
} & React.ComponentProps<'svg'>

const Svg = ({ size = 24, x = 24, y = x, children, ...props }: Props) => (
	<svg
		role='img'
		viewBox={`0 0 ${x} ${y}`}
		preserveAspectRatio='xMinYMin meet'
		css={{
			fill: 'currentColor',
			width: `${size}px`,
			height: `${size}px`,
		}}
		{...props}
	>
		{children}
	</svg>
)

export const AlertCircleIcon = (props: Props) => (
	<Svg {...props}>
		<path fill='currentColor' d={mdiAlertCircle} />
		<title>Alert</title>
	</Svg>
)

export const WindowCloseIcon = (props: Props) => (
	<Svg {...props}>
		<path fill='currentColor' d={mdiWindowClose} />
		<title>Close</title>
	</Svg>
)

export const LightDarkModeIcon = (props: Props) => (
	<Svg {...props}>
		<path fill='currentColor' d={mdiThemeLightDark} />
		<title>Light/Dark mode</title>
	</Svg>
)
