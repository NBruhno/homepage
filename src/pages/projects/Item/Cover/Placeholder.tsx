import { styled } from 'styled-components'

export const Placeholder = styled.div`
	flex-shrink: 0;
	background-color: ${({ theme }) => theme.color.input.backgroundHover};
	background-color: ${({ theme }) => `linear-gradient(134deg, ${theme.color.input.border} 0%, ${theme.color.input.backgroundHover} 63%, ${theme.color.input.background} 100%)`};
	height: 100%;
	width: 100%;
`
