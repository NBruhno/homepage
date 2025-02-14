import { styled } from 'styled-components'

import { adjustHsl } from 'lib/client'

export const Empty = styled.div`
	color: ${({ theme }) => theme.color.text};
	font-size: ${({ theme }) => theme.font.size.s90};
	padding: 0 12px;
	opacity: 0.7;
	border: 1px solid ${({ theme }) => theme.color.border};
	border-radius: 4px;
	height: 86px;
	display: flex;
	align-items: center;
	justify-content: space-around;
	background-color: ${({ theme }) => adjustHsl(theme.color.background, { alpha: 0.5 })};

	${({ theme }) => theme.mediaQueries.maxTablet} {
		padding: 0 10px;
		height: 50px;
		max-width: unset;
	}
`
