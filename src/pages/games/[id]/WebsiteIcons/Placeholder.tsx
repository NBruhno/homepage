import { styled } from 'styled-components'

export const Placeholder = styled.div`
	background-color: ${({ theme }) => theme.color.gray010};
	border-radius: 4px;
	width: 32px;
	height: 32px;
	padding: 2px;
	display: flex;
	align-items: center;
	justify-content: space-around;
`
