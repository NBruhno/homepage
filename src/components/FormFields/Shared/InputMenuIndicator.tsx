import { styled } from 'styled-components'

import { ChevronFlip } from 'components/ChevronFlip'
import { Spinner } from 'components/Spinner'

type Props = {
	isMenuOpen: boolean
	isLoading: boolean
}

export const InputMenuIndicator = styled.div.attrs<Props>(({ isLoading, isMenuOpen }) => ({
	children: isLoading ? <Spinner size={22} /> : <ChevronFlip isActive={!isMenuOpen} />,
}))<Props>`
	display: flex;
	align-items: center;
	justify-content: center;
	height: calc(100% - 12px);
	margin: 0;
	color: ${({ theme }) => theme.color.gray050};
	border-left: 1px solid ${({ theme }) => theme.color.gray020};
	padding: 0 10px;
`
