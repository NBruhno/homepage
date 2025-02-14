import NextLink from 'next/link'
import { styled } from 'styled-components'

export const Container = styled(NextLink)`
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
	transition:
		border 200ms ${({ theme }) => theme.animation.default},
		box-shadow 200ms ${({ theme }) => theme.animation.default};
	transform: none;

	&:hover {
		border: 1px solid ${({ theme }) => theme.color.primaryLighter};
		box-shadow: ${({ theme }) => (theme.isDarkTheme ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.1)')} 0px 3px 10px 0px;
	}

	&:active {
		border: 1px solid ${({ theme }) => theme.color.primary};
		box-shadow: rgba(0, 0, 0, 0.3) 0px 3px 10px 0px, 0 0 0 1px ${({ theme }) => theme.color.primary};
	}
`
