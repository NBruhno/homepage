import { styled } from 'styled-components'

import { adjustHsl } from 'lib/client'

export const Container = styled.aside`
	display: flex;
	flex-direction: column;
	border: 1px solid ${({ theme }) => theme.color.border};
	padding: 12px 10px;
	border-radius: 4px;
	font-size: ${({ theme }) => theme.font.size.s90};
	row-gap: 18px;
	margin-bottom: 12px;
	background-color: ${({ theme }) => adjustHsl(theme.color.background, { alpha: 0.5 })};

	&:last-child {
		margin-bottom: 0;
	}

	${({ theme }) => theme.mediaQueries.maxMobile} {
		max-width: unset;
	}
`
