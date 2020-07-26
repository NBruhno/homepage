import { mdiAlertCircle, mdiWindowClose, mdiThemeLightDark, mdiLogin, mdiPencilRuler, mdiTestTube, mdiGhost, mdiAccount, mdiAccountOff, mdiMenu, mdiLogout, mdiInformation, mdiGoogleController, mdiTools } from '@mdi/js'

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
			flexShrink: 0,
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

export const LoginIcon = (props: Props) => (
	<Svg {...props}>
		<path fill='currentColor' d={mdiLogin} />
		<title>Login</title>
	</Svg>
)

export const LogoutIcon = (props: Props) => (
	<Svg {...props}>
		<path fill='currentColor' d={mdiLogout} />
		<title>Logout</title>
	</Svg>
)

export const PencilRulerIcon = (props: Props) => (
	<Svg {...props}>
		<path fill='currentColor' d={mdiPencilRuler} />
		<title>Pencil and ruler</title>
	</Svg>
)

export const TestTubeIcon = (props: Props) => (
	<Svg {...props}>
		<path fill='currentColor' d={mdiTestTube} />
		<title>Test tube</title>
	</Svg>
)

export const GhostIcon = (props: Props) => (
	<Svg {...props}>
		<path fill='currentColor' d={mdiGhost} />
		<title>Ghost</title>
	</Svg>
)

export const AccountIcon = (props: Props) => (
	<Svg {...props}>
		<path fill='currentColor' d={mdiAccount} />
		<title>Account</title>
	</Svg>
)

export const AccountOffIcon = (props: Props) => (
	<Svg {...props}>
		<path fill='currentColor' d={mdiAccountOff} />
		<title>Account off</title>
	</Svg>
)

export const MenuIcon = (props: Props) => (
	<Svg {...props}>
		<path fill='currentColor' d={mdiMenu} />
		<title>Menu</title>
	</Svg>
)

export const InfoIcon = (props: Props) => (
	<Svg {...props}>
		<path fill='currentColor' d={mdiInformation} />
		<title>Info</title>
	</Svg>
)

export const ControllerIcon = (props: Props) => (
	<Svg {...props}>
		<path fill='currentColor' d={mdiGoogleController} />
		<title>Games</title>
	</Svg>
)

export const ToolsIcon = (props: Props) => (
	<Svg {...props}>
		<path fill='currentColor' d={mdiTools} />
		<title>Projects</title>
	</Svg>
)
