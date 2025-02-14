import { styled } from 'styled-components'

type Props = {
	isVisible: boolean
}

export const Container = styled.div<Props>`
	background-color: ${({ theme }) => theme.color.error};
	height: ${({ isVisible }) => (isVisible ? '33' : '0')}px;
	transition: height 135ms ease, box-shadow 135ms ease;
	width: calc(100% + 1px);
	border-radius: 4px;
	overflow: hidden;
	text-align: left;
`
