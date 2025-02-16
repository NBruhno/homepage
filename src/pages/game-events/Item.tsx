import NextLink from 'next/link'
import { css, styled } from 'styled-components'

type Props = {
	isLoading?: boolean
}

export const Item = styled(NextLink)<Props>`
	display: grid;
	grid-template: "logo title" 1fr "logo date" auto "games games" auto / 256px 1fr;
	gap: 12px;
	background-color: ${({ theme }) => theme.color.background};
	border: 1px solid ${({ theme }) => theme.color.gray020};
	border-radius: 4px;
	color: ${({ theme }) => theme.color.text};
	cursor: pointer;
	flex: calc(50% - 42px);
	align-self: flex-start;
	min-height: 220px;
	text-decoration: none;
	padding: 16px;
	height: fit-content;
	transition:
		border 200ms ${({ theme }) => theme.animation.default},
		box-shadow 200ms ${({ theme }) => theme.animation.default},
		background 200ms ${({ theme }) => theme.animation.default};

	${({ theme }) => theme.mediaQueries.maxLaptop} {
		text-align: center;
		flex: 100%;
		grid-template: "logo" 1fr "title" auto "date" auto "games" auto / auto;
	}

	${({ isLoading }) =>
		!isLoading
			? css`
		&:hover {
			border: 1px solid ${({ theme }) => theme.color.primaryLighter};
			background: ${({ theme }) => theme.color.input.backgroundHover};
			box-shadow: ${({ theme }) => (theme.isDarkTheme ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.1)')} 0px 3px 10px 0px;
		}
		&:active {
			border: 1px solid ${({ theme }) => theme.color.primary};
			box-shadow: rgba(0, 0, 0, 0.3) 0px 3px 10px 0px, 0 0 0 1px ${({ theme }) => theme.color.primary};
		}
	`
			: null}
`
