import { styled } from 'styled-components'

export const Container = styled.div`
	min-height: 100px;
	padding: 12px 16px;
	background-color: ${({ theme }) => (theme.isDarkTheme ? 'rgb(36, 36, 36)' : 'white')};
	color: ${({ theme }) => theme.color.text};
	border-radius: 12px;
	border: 1px solid ${({ theme }) => theme.color.border};
	margin-top: 8px;
`
