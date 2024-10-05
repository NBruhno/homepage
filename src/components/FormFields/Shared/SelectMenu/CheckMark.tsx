import type { ComponentPropsWithoutRef } from 'react'

import { IconCheck } from '@tabler/icons-react'
import { styled } from 'styled-components'

type Props = ComponentPropsWithoutRef<'div'> & {
	isChecked: boolean,
}

export const CheckMark = styled.div.attrs({
	children: <IconCheck size={14} />,
})<Props>`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 20px;
	height: 20px;
	flex-shrink: 0;
	background-color: ${({ theme }) => theme.color.primary};
	color: ${({ theme }) => theme.color.textInverted};
	opacity: ${({ isChecked }) => isChecked ? 1 : 0};
	border-radius: 100%;
`
