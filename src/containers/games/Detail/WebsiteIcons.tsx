import type { GameWebsite } from 'types'
import { IgdbWebsiteCategory } from 'types'

import {
	SteamIcon, GooglePlayIcon, GoGIcon, RedditIcon, AppleIcon, TwitterIcon, YouTubeIcon,
	EpicGamesIcon, ItchIoIcon, DiscordIcon, TwitchIcon, WorldIcon,
} from 'components/Icons'

export enum SortBy {
	Stores = 'stores',
}

type Props = {
	websites: Array<GameWebsite> | null,
	sortBy?: SortBy,
} & React.ComponentProps<'div'>

export const WebsiteIcons = ({ websites, sortBy, ...rest }: Props) => {
	const websiteInformation = {
		[IgdbWebsiteCategory.Android]: { logo: <GooglePlayIcon size={32} />, name: 'Google Play store' },
		[IgdbWebsiteCategory.Discord]: { logo: <DiscordIcon size={32} />, name: 'Discord' },
		[IgdbWebsiteCategory.EpicGames]: { logo: <EpicGamesIcon size={32} />, name: 'Epic Games store' },
		[IgdbWebsiteCategory.Facebook]: { logo: null, name: 'Deprecated' },
		[IgdbWebsiteCategory.GoG]: { logo: <GoGIcon size={32} />, name: 'Good old Games store' },
		[IgdbWebsiteCategory.Instagram]: { logo: null, name: 'Deprecated' },
		[IgdbWebsiteCategory.iPad]: { logo: <AppleIcon size={32} />, name: 'iPad site' },
		[IgdbWebsiteCategory.iPhone]: { logo: <AppleIcon size={32} />, name: 'iPhone site' },
		[IgdbWebsiteCategory.Itch]: { logo: <ItchIoIcon size={32} />, name: 'Itch.io website' },
		[IgdbWebsiteCategory.Official]: { logo: <WorldIcon size={32} />, name: 'Official website' },
		[IgdbWebsiteCategory.Reddit]: { logo: <RedditIcon size={32} />, name: 'Sub-reddit' },
		[IgdbWebsiteCategory.Steam]: { logo: <SteamIcon size={32} />, name: 'Steam store' },
		[IgdbWebsiteCategory.Twitch]: { logo: <TwitchIcon size={32} />, name: 'Twitch profile' },
		[IgdbWebsiteCategory.Twitter]: { logo: <TwitterIcon size={32} />, name: 'Twitter profile' },
		[IgdbWebsiteCategory.Wiki]: { logo: null, name: 'Deprecated' },
		[IgdbWebsiteCategory.Wikipedia]: { logo: null, name: 'Deprecated' },
		[IgdbWebsiteCategory.YouTube]: { logo: <YouTubeIcon size={32} />, name: 'YouTube channel' },
	}

	if (!websites || websites.length <= 0) return null

	const sortedList = () => {
		switch (sortBy) {
			case SortBy.Stores: return websites.filter(({ category }) => (
				category === IgdbWebsiteCategory.Official
				|| category === IgdbWebsiteCategory.Android
				|| category === IgdbWebsiteCategory.iPad
				|| category === IgdbWebsiteCategory.iPhone
				|| category === IgdbWebsiteCategory.Itch
				|| category === IgdbWebsiteCategory.GoG
				|| category === IgdbWebsiteCategory.EpicGames
				|| category === IgdbWebsiteCategory.Steam
			))
			default: return websites
		}
	}

	return (
		<div
			css={(theme: Theme) => ({
				gridGap: '6px',
				display: 'grid',
				gridTemplateColumns: `repeat(${sortedList().length}, 34px)`,
				maxWidth: '100%',

				[theme.mediaQueries.maxMobile]: {
					margin: '12px 0 32px',
					justifyContent: 'center',
				},
			})}
			{...rest}
		>
			{sortedList().map(({ url, category }, index) => (
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
					aria-label={websiteInformation[category].name}
				>
					{websiteInformation[category].logo}
				</a>
			))}
		</div>
	)
}
