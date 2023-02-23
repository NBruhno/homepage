import type { ComponentPropsWithoutRef } from 'react'

import { useModal } from 'states/page'

import { Card } from './Card'
import { Container } from './Container'
import { Shade } from './Shade'

export const Modal = (props: ComponentPropsWithoutRef<'div'>) => {
	const { allowClosure, show, content, onCloseModal, onClose, hasNoWrapper = false } = useModal()

	return (
		<>
			<Shade
				show={show}
				onClick={allowClosure
					? () => {
						onCloseModal()
						if (onClose) onClose()
					}
					: undefined}
			/>
			<Container show={show} hasNoWrapper={hasNoWrapper}>
				{hasNoWrapper ? content : (
					<Card {...props}>
						{content}
					</Card>
				)}
			</Container>
		</>
	)
}
