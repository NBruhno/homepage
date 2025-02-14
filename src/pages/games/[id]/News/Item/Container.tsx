import type { ComponentPropsWithoutRef } from 'react'

import { css, styled } from 'styled-components'

import { adjustHsl } from 'lib/client'

type Props = ComponentPropsWithoutRef<'a'> & {
	isLoading: boolean
}

export const Container = styled.a<Props>`
	display: flex;
	justify-content: space-between;
	column-gap: 16px;
	align-items: center;
	padding: 16px 20px;
	text-decoration: none;
	border: 1px solid ${({ theme }) => theme.color.border};
	background-color: ${({ theme }) => theme.color.backgroundHover};
	border-radius: 4px;
	transition: background-color 135ms ${({ theme }) => theme.animation.default}, border-color 135ms ${({ theme }) => theme.animation.default};
	color: ${({ theme }) => theme.color.text};

	${({ isLoading }) =>
		isLoading
			? css`
		pointer-events: none;
		cursor: auto;
	`
			: css`
		&:hover, &:focus, &:active {
			background-color: ${({ theme }) => adjustHsl(theme.color.primaryLighter, { alpha: 0.3 })};
			border-color: ${({ theme }) => theme.color.primary};
		}
	`}
`
