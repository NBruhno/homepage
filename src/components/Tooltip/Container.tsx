import type { ReactNode } from 'react'

import { styled } from 'styled-components'

import type { Placement } from '@floating-ui/react'
import { adjustHsl } from 'lib/client'

type Props = {
	children: ReactNode
	isHovered: boolean
	position: Placement
	timeToHover: number
}

export const Container = styled.div<Props>`
	padding: 10px 18px;
	min-width: 50px;
	max-width: 300px;
	border-radius: 4px;
	font-size: ${({ theme }) => theme.font.size.s90};
	background-color: ${({ theme }) => theme.color.input.background};
	box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.2);
	color: ${({ theme }) => theme.color.text};
	text-align: center;
	white-space: pre-wrap;
	word-break: break-all;
	z-index: 1000;
	position: relative;
	

	@supports ((-webkit-backdrop-filter: blur(4px)) or (backdrop-filter: blur(4px))) {
		backdrop-filter: blur(6px) brightness(75%) saturate(150%);
		background: linear-gradient(154deg, ${({ theme }) => adjustHsl(theme.color.gray020, { alpha: 0.45 })} 4.87%, ${({ theme }) => adjustHsl(theme.color.gray010, { alpha: 0.8 })} 75.88%);
		border-color: ${({ theme }) => adjustHsl(theme.color.gray020, { alpha: 0.7 })};
		box-shadow: inset 0 1px 1px 0 ${({ theme }) => adjustHsl(theme.color.gray020, { alpha: 0.15 })};
	}
`
