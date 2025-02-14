import { styled } from 'styled-components'

export const Placeholder = styled.div`
	background: ${({ theme }) => theme.color.input.background};
	background: ${({ theme }) => `linear-gradient(134deg, ${theme.color.input.border} 0%, ${theme.color.input.backgroundHover} 63%, ${theme.color.input.background} 100%)`};
	border-radius: 4px;
	height: 100%;
	width: 100%;
	max-height: 352px;
	max-width: 264px;
`
