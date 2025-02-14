import { styled } from 'styled-components'

type Props = {
	name?: string
	gap?: number
	rowGap?: number
	columnGap?: number
	shouldShow?: boolean
}

export const GridContainer = styled.div<Props>`
	grid-area: ${({ name }) => name};
	gap: ${({ gap }) => (gap ? `${gap}px` : 'unset')};
	row-gap: ${({ rowGap }) => (rowGap ? `${rowGap}px` : 'unset')};
	column-gap: ${({ columnGap }) => (columnGap ? `${columnGap}px` : 'unset')};

	${({ shouldShow = true }) => !shouldShow && 'display: none;'}
`
