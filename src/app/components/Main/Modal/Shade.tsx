import styled from 'styled-components'

import { adjustHsl } from 'lib/client'

type Props = {
	show?: boolean,
}

export const Shade = styled.div<Props>`
	background-color: ${({ show, theme }) => (show ? adjustHsl(theme.color.background, { alpha: 0.5 }) : 'unset')};
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 4;
	pointer-events: ${({ show }) => show ? 'auto' : 'none'};
	visibility: ${({ show }) => show ? 'visible' : 'hidden'};
	transition: background-color 135ms ${({ theme }) => theme.animation.default};
	overscroll-behavior: contain;

	@supports ((-webkit-backdrop-filter: blur(8px)) or (backdrop-filter: blur(8px))) {
		backdrop-filter: ${({ show }) => show ? 'blur(5px)' : 'none'};
		background-color: ${({ show, theme }) => show ? adjustHsl(theme.color.background, { alpha: 0.5 }) : 'unset'};
	}
`
