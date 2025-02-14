import { styled } from 'styled-components'

type Props = {
	type?: 'default' | 'large'
}

export const Platform = styled.div<Props>`
	color: ${({ theme }) => theme.color.textFaded};
	font-size: ${({ theme, type = 'default' }) => (type === 'large' ? theme.font.size.s80 : theme.font.size.s70)};
	display: flex;
	align-items: center;
	column-gap: ${({ type = 'default' }) => (type === 'large' ? '6px' : '5px')};
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`
