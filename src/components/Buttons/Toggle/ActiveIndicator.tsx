import { styled } from 'styled-components'

type Props = {
	shouldTransition: boolean
}

export const ActiveIndicator = styled.div<Props>`
	position: absolute;
	background-color: ${({ theme }) => theme.color.button.backgroundToggle};
	opacity: 0.5;
	z-index: 0;
	top: 2px;
	bottom: 2px;
	border-radius: 4px;
	transition: width ${({ theme }) => theme.animation.default}, transform ${({ theme }) => theme.animation.default}, opacity ${({ theme }) => theme.animation.default}, background-color ${({ theme }) => theme.animation.default};
	transition-duration: ${({ shouldTransition }) => (shouldTransition ? '135ms' : '0s')};
	pointer-events: none;

	&:has(+ div > button:active:not(:focus-visible)) {
		background-color: ${({ theme }) => theme.color.primary};
	}
`
