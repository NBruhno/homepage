import type { ReactNode } from 'react'

import { devtools } from 'zustand/middleware'
import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'

type Options = {
	allowClosure?: boolean
	hasNoWrapper?: boolean
	onClose?: (() => void) | null
}

type ModalState = {
	allowClosure?: boolean
	content: ReactNode
	hasNoWrapper?: boolean
	/** Function that will be called on modal closing. This is primarily used for cleanup. */
	onClose: (() => void) | null
	/** Wether or not the modal is visible */
	show: boolean

	onCloseModal: () => void
	onOpenModal: (content: ReactNode, options?: Options) => void
}

export const useModal = createWithEqualityFn<ModalState>()(
	devtools(
		(set, state) => ({
			allowClosure: true,
			show: false,
			content: null,
			hasNoWrapper: false,
			onClose: null,
			onCloseModal: () => {
				if (state().content) {
					if (state().onClose) state().onClose!()
					return set({ allowClosure: true, show: false, content: null, hasNoWrapper: false, onClose: null }, false, 'onCloseModal')
				}
			},
			onOpenModal: (content, options) => set({ show: true, content, ...options }, false, 'onOpenModal'),
		}),
		{ anonymousActionType: 'useModal' },
	),
	shallow,
)
