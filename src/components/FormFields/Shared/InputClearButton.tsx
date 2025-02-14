import { IconX } from '@tabler/icons-react'
import { styled } from 'styled-components'

import { ButtonIcon } from 'components/Buttons'

type Props = {
	label?: never
	isVisible?: boolean
}

export const InputClearButton = styled(ButtonIcon).attrs(({ onClick }) => ({
	label: <IconX size={22} />,
	onClick: (event) => {
		event.preventDefault()
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		if (onClick) return onClick(event)
		return
	},
}))<Props>`
	display: ${({ isVisible }) => !isVisible && 'none'};
	height: 100%;
	margin: 0;
	color: ${({ theme }) => theme.color.gray050};
	border-radius: 0;
	pointer-events: auto;
	width: 40px;

	&:last-child {
		border-radius: 0 2px 2px 0;
	}

	&:hover:enabled {
		background-color: ${({ theme }) => theme.color.errorBackgroundHover};
		color: ${({ theme }) => theme.color.error};
	}
`
