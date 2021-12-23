import type { ReactNode } from 'react'

import { useGlobalState } from 'states/global'

export type Modal = {
	allowClosure?: boolean,
	modalContent: ReactNode,
	hasNoWrapper?: boolean,
	showModal: boolean,
	onClose?: (() => void) | null,
}

type Options = {
	allowClosure?: boolean,
	hasNoWrapper?: boolean,
	onClose?: (() => void) | null,
}

export const useModal = () => {
	const [modal, setModal] = useGlobalState('modal')
	const openModal = (content: ReactNode, { allowClosure = true, onClose = null, hasNoWrapper = false }: Options = {}) => {
		setModal({ allowClosure, showModal: true, modalContent: content, onClose, hasNoWrapper })
	}

	const closeModal = () => {
		if (modal.modalContent) {
			setModal({ allowClosure: true, showModal: false, modalContent: null, onClose: null, hasNoWrapper: false })
		}
	}

	return {
		...modal,
		openModal,
		closeModal,
	}
}
