import { useGlobalState } from './globalState'

type Options = {
	allowClosure?: boolean,
	noWrapper?: boolean,
	onClose?: () => void,
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
