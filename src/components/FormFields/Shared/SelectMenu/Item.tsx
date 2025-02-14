import type { ComponentPropsWithoutRef } from 'react'

import { styled } from 'styled-components'

import { adjustHsl } from 'lib/client'

type Props = ComponentPropsWithoutRef<'div'> & {
	isHighlighted: boolean
	isSelected: boolean
}

export const Item = styled.div<Props>`
	background-color: ${({ theme, isHighlighted, isSelected }) => {
		if (isHighlighted) return adjustHsl(theme.color.primary, { alpha: 0.4 })
		if (isSelected) return adjustHsl(theme.color.primary, { alpha: 0.2 })
		return theme.color.input.background
	}};
	color: ${({ theme }) => theme.color.text};
	margin: 4px 6px;
	padding: 8px 10px;
	border-radius: 4px;
	transition: background-color 135ms ${({ theme }) => theme.animation.default};
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: space-between;
	column-gap: 8px;

	&:hover {
		background-color: ${({ theme }) => adjustHsl(theme.color.primary, { alpha: 0.4 })};
	}
`
