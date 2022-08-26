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
			})}
			{...props}
		>
			<div>
				<div>This website uses cookies to maintain login sessions</div>
				<Link href='/cookies' passHref>
					<a css={{ textDecoration: 'none' }}>You can read more about why and how this works here</a>
				</Link>
			</div>
			<ButtonBorder label='Dismiss' onClick={() => setIsDismissed()} />
		</div>
	)
}
