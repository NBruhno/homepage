import type { ComponentPropsWithoutRef } from 'react'

import { useModal } from 'states/modal'

import { Card } from 'components/Card'

import { Container } from './Container'
import { Shade } from './Shade'

export const Modal = (props: ComponentPropsWithoutRef<'div'>) => {
	const { allowClosure, showModal, modalContent, closeModal, onClose, hasNoWrapper = false } = useModal()

	return (
		<>
			<Shade
				show={showModal}
				onClick={allowClosure
					? () => {
						closeModal()
						if (onClose) onClose()
					}
					: undefined}
			/>
			<Container show={showModal} hasNoWrapper={hasNoWrapper}>
				{hasNoWrapper ? modalContent : (
					<Card {...props} css={{ textAlign: 'center', width: '100%' }}>
						{modalContent}
					</Card>
				)}
			</Container>
		</>
	)
}
