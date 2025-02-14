import { styled } from 'styled-components'

export const SteamItem = styled.a.attrs({
	target: '_blank',
	rel: 'noreferrer noopener',
	'aria-label': 'Steam reviews',
})`
	margin-top: 10px;
	overflow: none;
	display: flex;
	align-items: center;
	justify-content: center;
	column-gap: 8px;
	color: ${({ theme }) => theme.color.text};
	font-family: ${({ theme }) => theme.font.family.poppins};
	text-decoration: none;
`
