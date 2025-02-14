import { styled } from 'styled-components'

export const Container = styled.div`
	border-radius: 4px;
	background-color: ${({ theme }) => (theme.isDarkTheme ? theme.color.gray020 : theme.color.gray010)};
	font-size: ${({ theme }) => theme.font.size.s80};
	display: flex;
	align-items: center;
	column-gap: 4px;
	cursor: default;
	z-index: 2;
`
