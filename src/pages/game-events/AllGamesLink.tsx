import { styled } from 'styled-components'

export const AllGamesLink = styled.div`
	background: ${({ theme }) => [theme.color.input.backgroundHover, `linear-gradient(134deg, ${theme.color.input.border} 0%, ${theme.color.input.backgroundHover} 63%, ${theme.color.input.background} 100%)`]};
	aspect-ratio: 3/4;
	height: 100%;
	width: 100%;
	max-height: 352px;
	max-width: 264px;
	border-radius: 4px;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	font-size: ${({ theme }) => theme.font.size.s140};
	text-decoration: none;
	color: ${({ theme }) => theme.color.text};
`
