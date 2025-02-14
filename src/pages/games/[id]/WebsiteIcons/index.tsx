import {
	IconBrandApple,
	IconBrandBluesky,
	IconBrandDiscord,
	IconBrandGooglePlay,
	IconBrandReddit,
	IconBrandSteam,
	IconBrandTwitter,
	IconQuestionMark,
	IconWorld,
} from '@tabler/icons-react'
import { EpicGamesIcon, GoGIcon, ItchIoIcon } from 'components/Icons'
import { Tooltip } from 'components/Tooltip'
import type { ComponentPropsWithoutRef } from 'react'
import { useLoading, useResponsive } from 'states/page'
import type { GameWebsite } from 'types'
import { GameWebsiteType } from 'types'
import { Container } from './Container'
import { Link } from './Link'
import { Placeholder } from './Placeholder'

type Props = ComponentPropsWithoutRef<'div'> & {
	websites: Array<GameWebsite> | null
}

export const WebsiteIcons = ({ websites, ...rest }: Props) => {
	const { isDesktop, isDesktopLarge, isDesktopMax } = useResponsive()
	const { isLoading } = useLoading()
	const isDesktopOrHigher = isDesktop || isDesktopLarge || isDesktopMax
	const websiteInformation = {
		[GameWebsiteType.GooglePlayStore]: { logo: <IconBrandGooglePlay size={32} />, name: 'Google Play store' },
		[GameWebsiteType.Discord]: { logo: <IconBrandDiscord size={32} />, name: 'Discord server' },
		[GameWebsiteType.EpicGames]: { logo: <EpicGamesIcon size={32} />, name: 'Epic Games store' },
		[GameWebsiteType.GoG]: { logo: <GoGIcon size={32} />, name: 'Good old Games store' },
		[GameWebsiteType.AppStore]: { logo: <IconBrandApple size={32} />, name: 'App Store' },
		[GameWebsiteType.Itch]: { logo: <ItchIoIcon size={32} />, name: 'Itch.io website' },
		[GameWebsiteType.Official]: { logo: <IconWorld size={32} />, name: 'Official website' },
		[GameWebsiteType.Reddit]: { logo: <IconBrandReddit size={32} />, name: 'Sub-reddit' },
		[GameWebsiteType.Steam]: { logo: <IconBrandSteam size={32} />, name: 'Steam store' },
		[GameWebsiteType.Bluesky]: { logo: <IconBrandBluesky size={32} />, name: 'Bluesky profile' },
		[GameWebsiteType.Twitter]: { logo: <IconBrandTwitter size={32} />, name: 'Twitter profile' },
		[GameWebsiteType.Unknown]: { logo: <IconQuestionMark size={32} />, name: 'Unknown website' },
	}

	if (!websites || websites.length <= 0) return null

	return (
		<Container {...rest}>
			{isLoading && Array.from({ length: 5 }).map((_, index) => <Placeholder key={index} />)}
			{!isLoading &&
				websites.slice(0, isDesktopOrHigher ? websites.length : 5).map(({ url, type }, index) => {
					const { logo, name } = websiteInformation[type]

					return (
						<Tooltip
							tip={
								<>
									<h3 style={{ margin: '0 0 6px' }}>{name}</h3>
									{/* Remove https and www from the URL for display */}
									<span>{url.replace('https://', '').replace('www.', '')}</span>
								</>
							}
							key={index}
							show
							render={(props) => (
								<Link {...props} href={url} target='_blank' rel='noreferrer noopener' aria-label={name}>
									{logo}
								</Link>
							)}
						/>
					)
				})}
		</Container>
	)
}
