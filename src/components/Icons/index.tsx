import {
	mdiAlertCircle, mdiWindowClose, mdiThemeLightDark, mdiLogin, mdiPencilRuler, mdiTestTube, mdiGhost,
	mdiAccount, mdiAccountOff, mdiMenu, mdiLogout, mdiInformation, mdiGoogleController, mdiTools, mdiGithub,
	mdiGitlab, mdiLinkedin, mdiEmail, mdiSteam, mdiFacebook, mdiGooglePlay, mdiGog, mdiInstagram, mdiReddit,
	mdiApple, mdiWeb, mdiTwitch, mdiTwitter, mdiWikipedia, mdiYoutube, mdiFileDocumentMultiple, mdiDiscord,
} from '@mdi/js'

import { epicGamesIcon, itchIoIcon } from './CustomIcons'

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

export const GitHubIcon = (props: Props) => (
	<Svg {...props}>
		<path fill='currentColor' d={mdiGithub} />
		<title>GitHub</title>
	</Svg>
)

export const GitLabIcon = (props: Props) => (
	<Svg {...props}>
		<path fill='currentColor' d={mdiGitlab} />
		<title>GitLab</title>
	</Svg>
)

export const LinkedInIcon = (props: Props) => (
	<Svg {...props}>
		<path fill='currentColor' d={mdiLinkedin} />
		<title>LinkedIn</title>
	</Svg>
)

export const EmailIcon = (props: Props) => (
	<Svg {...props}>
		<path fill='currentColor' d={mdiEmail} />
		<title>Email</title>
	</Svg>
)

export const SteamIcon = (props: Props) => (
	<Svg {...props}>
		<path fill='currentColor' d={mdiSteam} />
		<title>Steam</title>
	</Svg>
)

export const FacebookIcon = (props: Props) => (
	<Svg {...props}>
		<path fill='currentColor' d={mdiFacebook} />
		<title>Facebook</title>
	</Svg>
)

export const GooglePlayIcon = (props: Props) => (
	<Svg {...props}>
		<path fill='currentColor' d={mdiGooglePlay} />
		<title>Google Play</title>
	</Svg>
)

export const GogIcon = (props: Props) => (
	<Svg {...props}>
		<path fill='currentColor' d={mdiGog} />
		<title>GoG</title>
	</Svg>
)

export const InstagramIcon = (props: Props) => (
	<Svg {...props}>
		<path fill='currentColor' d={mdiInstagram} />
		<title>Instagram</title>
	</Svg>
)

export const RedditIcon = (props: Props) => (
	<Svg {...props}>
		<path fill='currentColor' d={mdiReddit} />
		<title>Reddit</title>
	</Svg>
)

export const AppleIcon = (props: Props) => (
	<Svg {...props}>
		<path fill='currentColor' d={mdiApple} />
		<title>Apple</title>
	</Svg>
)

export const WebsiteIcon = (props: Props) => (
	<Svg {...props}>
		<path fill='currentColor' d={mdiWeb} />
		<title>Website</title>
	</Svg>
)

export const TwitchIcon = (props: Props) => (
	<Svg {...props}>
		<path fill='currentColor' d={mdiTwitch} />
		<title>Twitch</title>
	</Svg>
)

export const TwitterIcon = (props: Props) => (
	<Svg {...props}>
		<path fill='currentColor' d={mdiTwitter} />
		<title>Twitter</title>
	</Svg>
)

export const WikipediaIcon = (props: Props) => (
	<Svg {...props}>
		<path fill='currentColor' d={mdiWikipedia} />
		<title>Wikipedia</title>
	</Svg>
)

export const YouTubeIcon = (props: Props) => (
	<Svg {...props}>
		<path fill='currentColor' d={mdiYoutube} />
		<title>YouTube</title>
	</Svg>
)

export const WikiIcon = (props: Props) => (
	<Svg {...props}>
		<path fill='currentColor' d={mdiFileDocumentMultiple} />
		<title>Wiki</title>
	</Svg>
)

export const EpicGamesIcon = (props: Props) => (
	<Svg {...props} x={32}>
		<path fill='currentColor' d={epicGamesIcon} />
		<title>Epic Games</title>
	</Svg>
)

export const ItchIoIcon = (props: Props) => (
	<Svg {...props} x={32}>
		<path fill='currentColor' d={itchIoIcon} />
		<title>Itch.io</title>
	</Svg>
)

export const DiscordIcon = (props: Props) => (
	<Svg {...props}>
		<path fill='currentColor' d={mdiDiscord} />
		<title>Discord</title>
	</Svg>
)
