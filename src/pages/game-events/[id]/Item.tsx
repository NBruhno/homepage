import NextLink from 'next/link'
import { css, styled } from 'styled-components'

type Props = {
	isLoading?: boolean
}

export const Item = styled(NextLink)<Props>`
	display: flex;
	column-gap: 12px;
	row-gap: 12px;
	background-color: ${({ theme }) => theme.color.background};
	border: 1px solid ${({ theme }) => theme.color.gray020};
	border-radius: 8px;
	color: ${({ theme }) => theme.color.text};
	cursor: pointer;
	text-decoration: none;
	padding: 16px;
	transition: border 200ms ${({ theme }) => theme.animation.default}, box-shadow 200ms ${({ theme }) => theme.animation.default}, background 200ms ${({ theme }) => theme.animation.default};

	${({ isLoading }) =>
		!isLoading &&
		css`
		&:hover {
			border: 1px solid ${({ theme }) => theme.color.primaryLighter};
			background: ${({ theme }) => theme.color.input.backgroundHover};
			box-shadow: ${({ theme }) => (theme.isDarkTheme ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.1)')} 0px 3px 10px 0px;
		}

		&:active {
			border: 1px solid ${({ theme }) => theme.color.primary};
			box-shadow: rgba(0, 0, 0, 0.3) 0px 3px 10px 0px, 0 0 0 1px ${({ theme }) => theme.color.primary};
		}
	`}
`
