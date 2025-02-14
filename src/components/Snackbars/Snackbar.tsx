import { styled } from 'styled-components'

type Props = {
	isError: boolean
}

export const Snackbar = styled.div<Props>`
	background-color: ${({ isError, theme }) => (isError ? theme.color.error : theme.color.gray)};
	bottom: 24px;
	color: ${({ theme }) => (theme.isDarkTheme ? theme.color.text : theme.color.textInverted)};
	left: 50%;
	max-width: 250px;
	min-width: 100px;
	padding: 14px 16px;
	position: absolute;
	text-align: center;
	transform: translateX(-50%);
	border-radius: 4px;
	box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);
	z-index: 11;

	${({ theme }) => theme.mediaQueries.maxMobile} {
		bottom: 12px;
		box-shadow: none;
		left: 12px;
		max-width: none;
		min-width: none;
		right: 12px;
		transform: none;
	}
`
