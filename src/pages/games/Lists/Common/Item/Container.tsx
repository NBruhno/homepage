import NextLink from 'next/link'
import { css, styled } from 'styled-components'

type Props = {
	isLoading?: boolean
}

export const Container = styled(NextLink)<Props>`
	background-color: ${({ theme }) => theme.color.background};
	border: 1px solid ${({ theme }) => theme.color.gray020};
	border-radius: 4px;
	color: ${({ theme }) => theme.color.text};
	cursor: pointer;
	display: grid;
	grid-template-rows: 1fr;
	grid-template-columns: 120px fit-content(580px);
	margin-bottom: 12px;
	overflow: hidden;
	text-decoration: none;
	height: 168px;

	transition: border 200ms ${({ theme }) => theme.animation.default},
		box-shadow 200ms ${({ theme }) => theme.animation.default},
		background 200ms ${({ theme }) => theme.animation.default};

	${({ isLoading }) =>
		!isLoading &&
		css`
		&:hover {
			border: 1px solid ${({ theme }) => theme.color.primaryLighter};
			background: ${({ theme }) => [theme.color.input.backgroundHover, `linear-gradient(134deg, ${theme.color.input.border} 0%, ${theme.color.input.backgroundHover} 63%, ${theme.color.input.background} 100%)`]};
			box-shadow: ${({ theme }) => `${theme.isDarkTheme ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.1)'} 0px 3px 10px 0px`};
		}

		&:active {
			border: 1px solid ${({ theme }) => theme.color.primary};
			box-shadow: rgba(0, 0, 0, 0.3) 0px 3px 10px 0px, 0 0 0 1px ${({ theme }) => theme.color.primary};
		}
	`}
`
