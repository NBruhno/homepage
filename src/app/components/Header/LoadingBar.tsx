import styled, { keyframes } from 'styled-components'

import { useNavigationLoading } from 'states/page'

const animation = keyframes`
	0% {
		left: 0%;
		right: 100%;
		width: 0%;
	}
	20% {
		left: 0%;
		right: 65%;
		width: 45%;
	}
	80% {
		right: 0%;
		left: 65%;
		width: 45%;
	}
	100% {
		left: 100%;
		right: 0%;
		width: 0%;
	}
`

type Props = {
	isNavigationLoading: boolean,
}

const Wrapper = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	height: 2px;
	background: transparent;
	z-index: 999; // Should always be at the very top
`

const Bar = styled.div<Props>`
	position: absolute;
	top: 0;
	left: 0;
	right: 100%;
	width: 0;
	height: 2px;
	background-color: ${({ theme }) => theme.color.primaryLighter};
	display: ${({ isNavigationLoading }) => (isNavigationLoading ? 'inline' : 'none')};
	animation: ${animation} 1s linear infinite;
`

export const LoadingBar = () => {
	const isNavigationLoading = useNavigationLoading()

	return (
		<Wrapper>
			<Bar isNavigationLoading={isNavigationLoading} />
		</Wrapper>
	)
}
