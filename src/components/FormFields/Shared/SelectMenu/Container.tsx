import { styled } from 'styled-components'

type Props = {
	isOpen: boolean,
}

export const Container = styled.div<Props>`
	background: ${({ theme }) => theme.color.input.background};
	position: absolute;
	z-index: 4;
	border-radius: 4px;
	overflow-y: auto;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
	visibility: ${({ isOpen }) => isOpen ? 'visible' : 'hidden'};
	height: ${({ isOpen }) => isOpen ? 'unset' : 0};
	opacity: ${({ isOpen }) => isOpen ? 1 : 0};
	border: 1px solid ${({ theme }) => theme.color.border};
	transition: height 500ms ${({ theme }) => theme.animation.default}, opacity 200ms ${({ theme }) => theme.animation.default};
	max-height: 350px;
	padding: 6px 0;
	pointer-events: ${({ isOpen }) => (isOpen ? 'auto' : 'none')};

	::-webkit-scrollbar {
		background-color: transparent;
		margin-left: -8px;
		border-radius: 0 4px 4px 0;
	}
`
