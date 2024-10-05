import type { ComponentPropsWithoutRef } from 'react'

import NextLink from 'next/link'
import styled from 'styled-components'

import { useCookieBanner } from 'states/page'

import { adjustHsl } from 'lib/client'

import { ButtonBorder } from 'components/Buttons'

export const Container = styled.div`
	position: fixed;
	bottom: 54px;
	right: 64px;
	background-color: ${({ theme }) => theme.color.background};
	padding: 16px 24px;
	border-radius: 8px;
	font-size: ${({ theme }) => theme.font.size.s90};
	color: ${({ theme }) => theme.color.textFaded};
	display: flex;
	align-items: center;
	column-gap: 16px;
	border: 1px solid ${({ theme }) => theme.color.border};
	z-index: 1;

	${({ theme }) => theme.mediaQueries.maxLaptop} {
		right: 32px;
	}

	${({ theme }) => theme.mediaQueries.maxTablet} {
		right: 0;
		border-radius: 4px 0 0 4px;
		border-right: 'none';
	}

	${({ theme }) => theme.mediaQueries.maxMobile} {
		bottom: 0;
		right: 0;
		left: 0;
		border-radius: 0;
		border: 'none';
		border-top: 1px solid ${({ theme }) => theme.color.border};
		justify-content: 'center';
	}

	@supports ((-webkit-backdrop-filter: blur(5px)) or (backdrop-filter: blur(5px))) {
		backdrop-filter: blur(8px);
		background-color: ${({ theme }) => theme.isDarkTheme ? adjustHsl(theme.color.backgroundHover, { alpha: 0.85 }) : adjustHsl(theme.color.gray010, { alpha: 0.85 })};
	}
`

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
