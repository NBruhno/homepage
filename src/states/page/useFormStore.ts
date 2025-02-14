import { isEqual } from 'radash'
import { devtools } from 'zustand/middleware'
import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'

import type { SearchGamesModel } from 'pages/games/search.route'

import type { ChangePasswordModel } from 'components/Forms/ChangePassword'
import type { LoginModel, RegisterModel, TwoFactorModel } from 'components/Forms/Login'

export type FormState = {
	searchGames: Partial<SearchGamesModel>
	login: Partial<LoginModel>
	register: Partial<RegisterModel>
	'2fa': Partial<TwoFactorModel>
	changePassword: Partial<ChangePasswordModel>
}

export type FormActions = {
	setFormState: (name: keyof FormState, formState: FormState[keyof FormState]) => void
	resetFormState: (name: keyof FormState) => void
}

const initialValues: FormState = {
	searchGames: {},
	login: {},
	register: {},
	'2fa': {},
	changePassword: {},
}

export const useFormStore = createWithEqualityFn<FormState & FormActions>()(
	devtools(
		(set, state) => ({
			...initialValues,
			setFormState: (name, formState) => !isEqual(state()[name], formState) && set({ [name]: formState }, false, 'setFormState'),
			resetFormState: (name) => !isEqual(state(), initialValues) && set({ [name]: initialValues[name] }, false, 'resetFormState'),
		}),
		{ anonymousActionType: 'useFormStore' },
	),
	shallow,
)
