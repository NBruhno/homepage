import type { ComponentPropsWithoutRef } from 'react'

import { styled } from 'styled-components'

import { useScrollStore } from 'states/page'

import { adjustHsl } from 'lib/client'

type Props = {
	scrollY: number
}

const Container = styled.header<Props>`
	align-items: center;
	backdrop-filter: saturate(150%) blur(5px);
	background-color: ${({ theme }) => (theme.isDarkTheme ? theme.color.input.backgroundHover : theme.color.sidebarBackground)};
	box-shadow: ${({ theme, scrollY }) => (!theme.isDarkTheme && scrollY > 10 ? '0 2px 8px rgba(0, 0, 0, 0.15)' : 'none')};
	display: flex;
	height: 30px;
	padding: 12px;
	position: sticky;
	top: 0;
	transition: ${({ theme, scrollY }) => (!theme.isDarkTheme && scrollY > 10 ? `box-shadow 300ms ${theme.animation.default}` : 'none')};
	z-index: 10;

	&:hover {
		background-color: ${({ theme }) => adjustHsl(theme.isDarkTheme ? theme.color.input.backgroundHover : theme.color.sidebarBackground, { alpha: 0.9 })};
	}

	${({ theme }) => theme.mediaQueries.minMobile} {
		display: none;
		visibility: hidden;
	}
`

export const Header = (props: ComponentPropsWithoutRef<'header'>) => {
	const scrollY = useScrollStore((state) => state.scrollY)

	return <Container scrollY={scrollY} {...props} />
}
