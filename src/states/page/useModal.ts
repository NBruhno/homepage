import type { ReactNode } from 'react'

import create from 'zustand'
import { devtools } from 'zustand/middleware'

type Options = {
	allowClosure?: boolean,
	hasNoWrapper?: boolean,
	onClose?: (() => void) | null,
}

type ModalState = {
	allowClosure?: boolean,
	content: ReactNode,
	hasNoWrapper?: boolean,
	/** Function that will be called on modal closing. This is primarily used for cleanup. */
	onClose: (() => void) | null,
	/** Wether or not the modal is visible */
	show: boolean,

	onCloseModal: () => void,
	onOpenModal: (content: ReactNode, options?: Options) => void,
}

export const useModal = create(devtools<ModalState>((set, state) => ({
	allowClosure: true,
	show: false,
	content: null,
	hasNoWrapper: false,
	onClose: null,
	onCloseModal: () => state().content ? set({ allowClosure: true, show: false, content: null, hasNoWrapper: false }) : undefined,
	onOpenModal: (content, options) => set({ show: true, content, ...options }),
}), { name: 'useModal' }))
