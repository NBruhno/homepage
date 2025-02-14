import { styled } from 'styled-components'

export const Placeholder = styled.div`
	background: ${({ theme }) => [theme.color.input.backgroundHover, `linear-gradient(134deg, ${theme.color.input.border} 0%, ${theme.color.input.backgroundHover} 63%, ${theme.color.input.background} 100%)`]};
	aspect-ratio: 3 / 4;
	height: 100%;
	width: 100%;
	max-height: 352px;
	max-width: 264px;
	border-radius: 4px;
`
