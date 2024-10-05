import type { ComponentPropsWithoutRef } from 'react'

import styled from 'styled-components'

import { useResponsive } from 'states/page'

type Props = {
	showMenu: boolean,
}

export const StyledShade = styled.div<Props>`
	background-color: ${({ theme }) => theme.color.black};
	bottom: 0;
	left: 0;
	right: 0;
	top: 54px;
	opacity: 0;
	pointer-events: none;
	position: fixed;
	z-index: 9;
	display: none;

	${({ theme }) => theme.mediaQueries.maxMobile} {
		display: inline;
		visibility: ${({ showMenu }) => showMenu ? 'visible' : 'hidden'};
		opacity: ${({ showMenu }) => showMenu ? 0.4 : 0};
		transition: opacity 300ms ${({ theme }) => theme.animation.default};
		pointer-events: ${({ showMenu }) => showMenu ? 'auto' : 'none'};
	}
`

export const Shade = (props: ComponentPropsWithoutRef<'div'>) => {
	const { showMenu, setResponsiveState } = useResponsive()

	return (
		<StyledShade
			onClick={() => setResponsiveState({ showMenu: false })}
			aria-hidden='true'
			showMenu={showMenu}
			{...props}
		/>
	)
}
