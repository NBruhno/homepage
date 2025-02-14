import { styled } from 'styled-components'

type Props = {
	width: number | string
}

export const Fill = styled.span<Props>`
	display: inline-block;
	background-color: currentColor;
	height: calc(1em - 3px);
	border-radius: 0.4em;
	opacity: 0.2;
	margin-top: 3px;
	width: ${({ width }) => width};
`
