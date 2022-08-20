import isEqual from 'lodash/isEqual'
import create from 'zustand'
import { devtools } from 'zustand/middleware'

import type { SearchGamesModel } from 'pages/games/search.route'

import type { ChangePasswordModel } from 'components/Forms/ChangePassword'
import type { LoginModel, RegisterModel, TwoFactorModel } from 'components/Forms/Login'

export type Forms = {
	searchGames: Partial<SearchGamesModel>,
	login: Partial<LoginModel>,
	register: Partial<RegisterModel>,
	'2fa': Partial<TwoFactorModel>,
	changePassword: Partial<ChangePasswordModel>,
}

export type FormState = Forms & {
	setFormState: (name: keyof Forms, formState: Forms[keyof Forms]) => void,
	resetFormState: (name: keyof Forms) => void,
}

const initialValues: Forms = {
	searchGames: {},
	login: {},
	register: {},
	'2fa': {},
	changePassword: {},
}

export const useFormStore = create(devtools<FormState>((set, state) => ({
	...initialValues,
	setFormState: (name, formState) => !isEqual(state()[name], formState) && set({ [name]: formState }, false, 'setFormState'),
	resetFormState: (name) => !isEqual(state()[name], initialValues) && set({ [name]: initialValues[name] }, false, 'resetFormState'),
}), { anonymousActionType: 'useFormStore' }))
