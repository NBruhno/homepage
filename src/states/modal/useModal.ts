import { useGlobalState } from 'states/global'

export type Modal = {
	allowClosure?: boolean,
	modalContent: React.ReactNode,
	noWrapper?: boolean,
	showModal: boolean,
	onClose?: (() => void) | null,
}

type Options = {
	allowClosure?: boolean,
	noWrapper?: boolean,
	onClose?: (() => void) | null,
}

export const useModal = () => {
	const [modal, setModal] = useGlobalState('modal')
	const openModal = (content: React.ReactNode, { allowClosure = true, onClose = null, noWrapper = false }: Options = {}) => {
		setModal({ allowClosure, showModal: true, modalContent: content, onClose, noWrapper })
	}

	const closeModal = () => {
		setModal({ allowClosure: true, showModal: false, modalContent: null, onClose: null, noWrapper: false })
	}

	return {
		...modal,
		openModal,
		closeModal,
	}
}
