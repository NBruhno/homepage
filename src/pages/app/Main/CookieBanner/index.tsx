import type { ComponentPropsWithoutRef } from 'react'

import NextLink from 'next/link'

import { useCookieBanner } from 'states/page'

import { adjustHsl } from 'lib/client'

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

				'@supports ((-webkit-backdrop-filter: blur(5px)) or (backdrop-filter: blur(5px)))': {
					backdropFilter: 'blur(8px)',
					backgroundColor: theme.isDarkTheme ? adjustHsl(theme.color.backgroundHover, { alpha: 0.85 }) : adjustHsl(theme.color.gray010, { alpha: 0.85 }),
				},
			})}
			{...props}
		>
			<div>
				<div>This website uses cookies to maintain login sessions</div>
				<NextLink href='/cookies' passHref css={{ textDecoration: 'none' }} onClick={() => setIsDismissed()} role='button' tabIndex={0}>
					You can learn more about cookies on this website here
				</NextLink>
			</div>
			<ButtonBorder label='Dismiss' onClick={() => setIsDismissed()} css={{ flexShrink: 0 }} />
		</div>
	)
}
