import type { ComponentPropsWithoutRef } from 'react'

import Link from 'next/link'

import { useCookieBanner } from 'states/page'

import { ButtonBorder } from 'components/Buttons'

export const CookieBanner = (props: ComponentPropsWithoutRef<'div'>) => {
	const { isDismissed, setIsDismissed } = useCookieBanner()

	if (isDismissed) return null

	return (
		<div
			css={(theme) => ({
				position: 'fixed',
				bottom: '54px',
				right: '64px',
				backgroundColor: theme.isDarkTheme ? theme.color.backgroundHover : theme.color.gray010,
				padding: '16px 24px',
				borderRadius: '8px',
				fontSize: theme.font.size.s90,
				color: theme.color.textFaded,
				display: 'flex',
				alignItems: 'center',
				columnGap: '16px',
				border: `1px solid ${theme.color.border}`,
				zIndex: 1,

				[theme.mediaQueries.maxLaptop]: {
					right: '32px',
				},

				[theme.mediaQueries.maxTablet]: {
					right: '0',
					borderRadius: '4px 0 0 4px',
					borderRight: 'none',
				},

				[theme.mediaQueries.maxMobile]: {
					bottom: 0,
					right: 0,
					left: 0,
					borderRadius: 0,
					border: 'none',
					borderTop: `1px solid ${theme.color.border}`,
					justifyContent: 'center',
				},
			})}
			{...props}
		>
			<div>
				<div>This website uses cookies to maintain login sessions</div>
				<Link href='/cookies' passHref>
					<a css={{ textDecoration: 'none' }}>You can read more about why and how this works here</a>
				</Link>
			</div>
			<ButtonBorder label='Dismiss' onClick={() => setIsDismissed()} css={{ flexShrink: 0 }} />
		</div>
	)
}
