import { styled } from 'styled-components'

type Props = {
	width: number | string
	height: number | string
}

export const Placeholder = styled.div<Props>`
	flex-shrink: 0;
	background-color: ${({ theme }) => theme.color.grayDark};
	height: ${({ height }) => `${height}px`};
	width: ${({ width }) => `${width}px`};
	margin-top: 12px;
`
