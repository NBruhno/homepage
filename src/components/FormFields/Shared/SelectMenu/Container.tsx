import { styled } from 'styled-components'

type Props = {
	isOpen: boolean
}

export const Container = styled.div<Props>`
	background: ${({ theme }) => theme.color.input.background};
	border-radius: 4px;
	overflow-y: auto;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
	border: 1px solid ${({ theme }) => theme.color.border};
	padding: 6px 0;
	display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
	visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
	pointer-events: ${({ isOpen }) => (isOpen ? 'auto' : 'none')};

	::-webkit-scrollbar {
		background-color: transparent;
		margin-left: -8px;
		border-radius: 0 4px 4px 0;
	}
`
