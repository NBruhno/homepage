import type { Website } from 'types/Games'
import { WebsiteCategory } from 'types/IGDB'

import {
	SteamIcon, GooglePlayIcon, FacebookIcon, GogIcon, InstagramIcon, RedditIcon, AppleIcon, WebsiteIcon,
	TwitterIcon, WikiIcon, YouTubeIcon, WikipediaIcon, EpicGamesIcon, ItchIoIcon, DiscordIcon, TwitchIcon,
} from 'components/Icons'

export enum SortBy {
	Stores = 'stores',
}

type Props = {
	websites: Array<Website> | null,
	sortBy?: SortBy,
} & React.ComponentProps<'div'>

export const WebsiteIcons = ({ websites, sortBy, ...rest }: Props) => {
	const WebsiteLogos = {
		[WebsiteCategory.Android]: <GooglePlayIcon size={32} />,
		[WebsiteCategory.Discord]: <DiscordIcon size={32} />,
		[WebsiteCategory.EpicGames]: <EpicGamesIcon size={32} />,
		[WebsiteCategory.Facebook]: <FacebookIcon size={32} />,
		[WebsiteCategory.GoG]: <GogIcon size={32} />,
		[WebsiteCategory.Instagram]: <InstagramIcon size={32} />,
		[WebsiteCategory.iPad]: <AppleIcon size={32} />,
		[WebsiteCategory.iPhone]: <AppleIcon size={32} />,
		[WebsiteCategory.Itch]: <ItchIoIcon size={32} />,
		[WebsiteCategory.Official]: <WebsiteIcon size={32} />,
		[WebsiteCategory.Reddit]: <RedditIcon size={32} />,
		[WebsiteCategory.Steam]: <SteamIcon size={32} />,
		[WebsiteCategory.Twitch]: <TwitchIcon size={32} />,
		[WebsiteCategory.Twitter]: <TwitterIcon size={32} />,
		[WebsiteCategory.Wiki]: <WikiIcon size={32} />,
		[WebsiteCategory.Wikipedia]: <WikipediaIcon size={32} />,
		[WebsiteCategory.YouTube]: <YouTubeIcon size={32} />,
	}

	if (!websites || websites.length <= 0) return null

	const sortedList = () => {
		switch (sortBy) {
			case SortBy.Stores: return websites.filter(({ category }) => (
				category === WebsiteCategory.Official
				|| category === WebsiteCategory.Android
				|| category === WebsiteCategory.iPad
				|| category === WebsiteCategory.iPhone
				|| category === WebsiteCategory.Itch
				|| category === WebsiteCategory.GoG
				|| category === WebsiteCategory.EpicGames
				|| category === WebsiteCategory.Steam
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
					rel='noreferrer'
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
				>
					{WebsiteLogos[category]}
				</a>
			))}
		</div>
	)
}
