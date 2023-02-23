import type { ComponentPropsWithoutRef } from 'react'
import type { GameWebsite } from 'types'
import { GameWebsiteType } from 'types'

import { IconBrandApple, IconBrandDiscord, IconBrandGooglePlay, IconBrandReddit, IconBrandSteam, IconBrandTwitter, IconQuestionMark, IconWorld } from '@tabler/icons-react'

import { useLoading, useResponsive } from 'states/page'

import { GoGIcon, EpicGamesIcon, ItchIoIcon } from 'components/Icons'
import { Tooltip } from 'components/Tooltip'

type Props = ComponentPropsWithoutRef<'div'> & {
	websites: Array<GameWebsite> | null,
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
		[GameWebsiteType.Twitter]: { logo: <IconBrandTwitter size={32} />, name: 'Twitter profile' },
		[GameWebsiteType.Unknown]: { logo: <IconQuestionMark size={32} />, name: 'Unknown website' },
	}

	if (!websites || websites.length <= 0) return null

	return (
		<div
			css={(theme) => ({
				gridGap: '6px',
				display: 'flex',
				overflow: 'hidden',

				[theme.mediaQueries.maxMobile]: {
					justifyContent: 'center',
				},
			})}
			{...rest}
		>
			{isLoading && Array.from({ length: 5 }).map((_, index) => (
				<div
					key={index}
					css={(theme) => ({
						backgroundColor: theme.color.gray010,
						borderRadius: '4px',
						width: '32px',
						height: '32px',
						padding: '2px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-around',
					})}
				/>
			))}
			{!isLoading && websites.slice(0, isDesktopOrHigher ? websites.length : 5).map(({ url, type }, index) => {
				const { logo, name } = websiteInformation[type]

				return (
					<Tooltip
						tip={(
							<>
								<h3 css={{ margin: '0 0 6px' }}>{name}</h3>
								{/* Remove https and www from the URL for display */}
								<span>{url.replace('https://', '').replace('www.', '')}</span>
							</>
						)}
						key={index}
						show
					>
						<a
							href={url}
							target='_blank'
							rel='noreferrer noopener'
							css={(theme) => ({
								color: theme.color.gray070,
								maxHeight: '32px',
								maxWidth: '36px',
								padding: '2px',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-around',

								'&:hover': {
									color: theme.color.gray100,
								},
							})}
							aria-label={name}
						>
							{logo}
						</a>
					</Tooltip>
				)
			})}
		</div>
	)
}
