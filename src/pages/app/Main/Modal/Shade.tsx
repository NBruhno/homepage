import { FloatingOverlay } from '@floating-ui/react'
import { adjustHsl } from 'lib/client'
import { styled } from 'styled-components'

type Props = {
	show?: boolean
}

export const Shade = styled(FloatingOverlay)<Props>`
	display: grid;
	place-items: center;
	background-color: ${({ show, theme }) => (show ? adjustHsl(theme.color.black, { alpha: 0.4 }) : 'unset')};
	z-index: 4;
	transition: background-color 200ms ${({ theme }) => theme.animation.default};
	pointer-events: ${({ show }) => (show ? 'auto' : 'none')};
	visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
`
