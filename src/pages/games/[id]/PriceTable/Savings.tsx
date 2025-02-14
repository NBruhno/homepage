import type { ComponentPropsWithoutRef } from 'react'

import { styled } from 'styled-components'

type Props = ComponentPropsWithoutRef<'div'> & {
	difference: number
}

export const Savings = styled.div.attrs<Props>(({ difference }) => ({
	children: difference === 0 ? 'Retail' : `${difference}% off`,
}))<Props>`
	color: ${({ difference, theme }) => (difference === 0 ? theme.color.textSubtitle : theme.color.success)};
	font-size: ${({ theme }) => theme.font.size.s80};
	text-align: right;
	line-height: 1;
`
