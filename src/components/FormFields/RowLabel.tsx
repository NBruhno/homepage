import { styled } from 'styled-components'

type Props = {
	isSlim?: boolean
}

export const RowLabel = styled.label<Props>`
	display: grid;
	grid-template-columns: min-content 1fr;
	color: ${({ theme }) => theme.color.text};
	font-size: ${({ theme }) => theme.font.size.s115};
	font-family: ${({ theme }) => theme.font.family.poppins};
	font-weight: ${({ theme }) => theme.font.weight.light};
	margin: ${({ isSlim }) => (isSlim ? 0 : '0 12px 20px 0')};
	position: relative;
`
