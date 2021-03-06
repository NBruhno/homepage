import type { GameWebsite } from 'types'
import { GameWebsiteType } from 'types'

import {
	SteamIcon, GooglePlayIcon, GoGIcon, RedditIcon, AppleIcon, TwitterIcon,
	EpicGamesIcon, ItchIoIcon, DiscordIcon, WorldIcon, QuestionMarkIcon,
} from 'components/Icons'

export enum SortBy {
	Stores = 'stores',
}

type Props = {
	websites: Array<GameWebsite> | null,
	sortBy?: SortBy,
} & React.ComponentProps<'div'>

export const WebsiteIcons = ({ websites, ...rest }: Props) => {
	const websiteInformation = {
		[GameWebsiteType.GooglePlayStore]: { logo: <GooglePlayIcon size={32} />, name: 'Google Play store' },
		[GameWebsiteType.Discord]: { logo: <DiscordIcon size={32} />, name: 'Discord server' },
		[GameWebsiteType.EpicGames]: { logo: <EpicGamesIcon size={32} />, name: 'Epic Games store' },
		[GameWebsiteType.GoG]: { logo: <GoGIcon size={32} />, name: 'Good old Games store' },
		[GameWebsiteType.AppStore]: { logo: <AppleIcon size={32} />, name: 'App Store' },
		[GameWebsiteType.Itch]: { logo: <ItchIoIcon size={32} />, name: 'Itch.io website' },
		[GameWebsiteType.Official]: { logo: <WorldIcon size={32} />, name: 'Official website' },
		[GameWebsiteType.Reddit]: { logo: <RedditIcon size={32} />, name: 'Sub-reddit' },
		[GameWebsiteType.Steam]: { logo: <SteamIcon size={32} />, name: 'Steam store' },
		[GameWebsiteType.Twitter]: { logo: <TwitterIcon size={32} />, name: 'Twitter profile' },
		[GameWebsiteType.Unknown]: { logo: <QuestionMarkIcon size={32} />, name: 'Unknown website' },
	}

	if (!websites || websites.length <= 0) return null

	return (
		<div
			css={(theme: Theme) => ({
				gridGap: '6px',
				display: 'grid',
				gridTemplateColumns: `repeat(${websites.length}, 34px)`,
				maxWidth: '100%',

				[theme.mediaQueries.maxMobile]: {
					margin: '12px 0 32px',
					justifyContent: 'center',
				},
			})}
			{...rest}
		>
			{websites.map(({ url, type }, index) => (
				<a
					href={url}
					target='_blank'
					rel='noreferrer noopener'
					key={index}
					css={(theme: Theme) => ({
						color: theme.color.gray070,
						maxHeight: '32px',
						maxWidth: '36px',
						padding: '2px',

						'&:hover': {
							color: theme.color.gray100,
						},
					})}
					aria-label={websiteInformation[type].name}
				>
					{websiteInformation[type].logo}
				</a>
			))}
		</div>
	)
}
