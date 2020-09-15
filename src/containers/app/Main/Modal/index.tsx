import { useModal } from 'states/modal'

import { Card } from 'components/Card'

import { Container } from './Container'
import { Shade } from './Shade'

export const Modal = (props: React.ComponentProps<'div'>) => {
	const { allowClosure, showModal, modalContent, closeModal, onClose, noWrapper } = useModal()

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
			<Container show={showModal} noWrapper={noWrapper}>
				{noWrapper ? modalContent : (
					<Card {...props} css={{ textAlign: 'center', width: '100%' }}>
						{modalContent}
					</Card>
				)}
			</Container>
		</>
	)
}
