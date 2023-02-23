import type { UserRole } from '@prisma/client'

import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type User = {
	accessToken: string,
	email: string,
	role: UserRole,
	userId: string | null,
	username: string,
}

const initialState = {
	accessToken: undefined,
	email: null,
	intermediateToken: undefined,
	isStateKnown: false,
	role: undefined,
	shouldRefresh: false,
	twoFactorSecret: undefined,
	userId: null,
	username: null,
}

export type UserState = {
	accessToken?: string | undefined,
	email: string | null,
	intermediateToken?: string | undefined,
	isStateKnown: boolean,
	role?: UserRole | undefined,
	shouldRefresh: boolean,
	twoFactorSecret?: string,
	userId: string | null,
	username: string | null,

	resetUser: () => void,
	setIntermediateToken: (intermediateUser: { intermediateToken: string, userId: string }) => void,
	setIsStateKnown: (isStateKnown: boolean) => void,
	setShouldRefresh: (shouldRefresh: boolean) => void,
	setTwoFactorSecret: (secret: string) => void,
	setUser: (user: User) => void,
}

export const useUser = create<UserState>()(devtools((set) => ({
	...initialState,
	resetUser: () => set({ ...initialState, isStateKnown: true }, false, 'resetUser'),
	setIntermediateToken: (intermediateUser) => set(intermediateUser, false, 'setIntermediateToken'),
	setIsStateKnown: (isStateKnown) => set({ isStateKnown }, false, 'setIsStateKnown'),
	setShouldRefresh: (shouldRefresh) => set({ shouldRefresh }, false, 'setShouldRefresh'),
	setTwoFactorSecret: (twoFactorSecret) => set({ twoFactorSecret }, false, 'setTwoFactorSecret'),
	setUser: (user) => set(user, false, 'setUser'),
}), { anonymousActionType: 'useUser' }))
