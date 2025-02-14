import { IconEye, IconEyeOff } from '@tabler/icons-react'
import { styled } from 'styled-components'

import { ButtonIcon } from 'components/Buttons'
import type { ComponentPropsWithRef } from 'react'
import type { Merge } from 'type-fest'

type InternalProps = {
	isVisible?: boolean
	isEnabled: boolean
}

type Props = Merge<
	ComponentPropsWithRef<typeof ButtonIcon>,
	{
		isVisible?: boolean
		isEnabled: boolean
		label?: never
	}
>

export const InputVisibleButton = styled(ButtonIcon).attrs<InternalProps>(({ isEnabled, onClick }) => ({
	label: isEnabled ? <IconEyeOff size={22} /> : <IconEye size={22} />,
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
		color: ${({ theme }) => theme.color.primary};
	}
`
