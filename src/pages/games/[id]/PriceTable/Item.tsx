/* eslint-disable jsx-a11y/anchor-has-content */

import type { ComponentPropsWithoutRef } from 'react'

import { styled } from 'styled-components'

import { adjustHsl } from 'lib/client'

type Props = ComponentPropsWithoutRef<'a'> & {
	isFirst?: boolean
}

export const Item = styled.a<Props>`
	background-color: transparent;
	border-top-left-radius: 4px;
	border-top-right-radius: 4px;
	border-bottom-left-radius: ${({ isFirst }) => (isFirst ? 0 : '4px')};
	border-bottom-right-radius: ${({ isFirst }) => (isFirst ? 0 : '4px')};
	color: ${({ theme }) => theme.color.text};
	display: flex;
	font-family: ${({ theme }) => theme.font.family.poppins};
	align-items: center;
	justify-content: space-between;
	margin: 0;
	padding: 6px 10px;
	text-decoration: none;
	transition: background-color 135ms ${({ theme }) => theme.animation.default};

	&:hover,
	&:focus,
	&:active {
		background-color: ${({ theme }) => adjustHsl(theme.color.primary, { alpha: 0.3 })};
		border-color: ${({ theme }) => theme.color.primary};
	}
`
