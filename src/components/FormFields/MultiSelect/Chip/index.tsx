/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import type { ComponentPropsWithRef, ReactNode } from 'react'

import { IconX } from '@tabler/icons-react'
import { forwardRef } from 'react'

import { ButtonClear } from './ButtonClear'
import { Container } from './Container'
import { Label } from './Label'

type Props = ComponentPropsWithRef<'div'> & {
	children: ReactNode
	isHighlighted: boolean
	onRemoveChip: () => void
}

export const Chip = forwardRef<HTMLDivElement, Props>(({ children, onRemoveChip, isHighlighted }, ref) => (
	<Container onClick={(event) => event.preventDefault()} ref={ref}>
		<Label>{children}</Label>
		<ButtonClear
			tabIndex={-1}
			isHighlighted={isHighlighted}
			onClick={(event) => {
				event.stopPropagation()
				onRemoveChip()
			}}
			label={<IconX size={16} />}
		/>
	</Container>
))
