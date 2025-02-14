import { styled } from 'styled-components'

type Props = {
	rowIndex: number
}

export const GamesRow = styled.div<Props>`
	top: calc(200px * ${({ rowIndex }) => rowIndex});
	position: relative;
	display: flex;
	height: 150px;
`
