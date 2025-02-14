import type { ComponentPropsWithoutRef } from 'react'

import NextLink from 'next/link'

import { useCookieBanner } from 'states/page'

import { ButtonBorder } from 'components/Buttons'
import { Container } from './Container'

export const CookieBanner = (props: ComponentPropsWithoutRef<'div'>) => {
	const { isDismissed, setIsDismissed } = useCookieBanner()

	if (isDismissed) return null

	return (
		<Container {...props}>
			<div>
				<div>This website uses cookies to maintain login sessions</div>
				<NextLink href='/cookies' passHref style={{ textDecoration: 'none' }} onClick={() => setIsDismissed()} role='button' tabIndex={0}>
					You can learn more about cookies on this website here
				</NextLink>
			</div>
			<ButtonBorder label='Dismiss' onClick={() => setIsDismissed()} style={{ flexShrink: 0 }} />
		</Container>
	)
}
