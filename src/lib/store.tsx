import { createContext, useContext, useReducer, useEffect, useState, Dispatch } from 'react'
import { useMediaQuery } from 'react-responsive'

import { screenSizes } from 'styles/theme'

type State = {
	count: number,
	responsive: {
		collapsedSidebar: boolean,
		darkTheme: boolean,
		isMobile: boolean,
		isTablet: boolean,
	},
	darkTheme: boolean,
	user: {
		accessToken?: string,
		displayName: string,
		email: string,
		intermediateToken?: string,
		isStateKnown: boolean,
		secret?: string,
		shouldRefresh: boolean,
	},
	form: Record<string, any>,
	test: Record<any, any>,
	tests: Record<any, any>,
	task: Record<any, any>,
	tasks: Record<any, any>,
}

const StoreContext = createContext<{ state: State, dispatch: Dispatch<Record<string, any>> }>(undefined)
export const initialState = {
	responsive: {
		collapsedSidebar: false,
		darkTheme: true,
		isMobile: false,
		isTablet: false,
	},
	count: 0,
	darkTheme: true,
	user: {
		displayName: undefined,
		email: undefined,
		isStateKnown: false,
		accessToken: undefined,
		shouldRefresh: false,
	},

	form: undefined,
	test: { data: undefined, loading: true, error: undefined },
	tests: { data: [], loading: true, error: undefined },

	task: { data: undefined, loading: true, error: undefined },
	tasks: { data: [], loading: true, error: undefined },
} as State

const reducer = (state: State, payload: Record<string, any>) => {
	if (payload) {
		return { ...state, ...payload }
	} else {
		throw new Error(`No payload specified`)
	}
}

/**
 * Global store provider used in conjunction with `useStore` to populate and read the store from any child of the provider.
 * @param children - `ReactNode`, there should never be more than one child in the array
 * @example
 * ```tsx
 * <StoreProvider>
 * 	<Page>
 * 		{...}
 * 	</Page>
 * </StoreProvider>
 * ```
 */
export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
	const [state, dispatch] = useReducer(reducer, initialState, ((lazyState) => lazyState))
	const isMobile = useMediaQuery({ query: `(max-width: ${screenSizes.mobile - 1}px` })
	const isLaptop = useMediaQuery({ query: `(max-width: ${screenSizes.laptop - 1}px` })
	const systemPrefersDark = useMediaQuery({ query: '(prefers-color-scheme: dark)' }, undefined, (darkTheme: boolean) => {
		setIsDark(darkTheme)
	})
	const [isDark, setIsDark] = useState(systemPrefersDark)

	useEffect(() => {
		dispatch({ responsive: { isMobile, isLaptop, darkTheme: isDark, collapsedSidebar: isLaptop || isMobile } })
	}, [isMobile, isLaptop, isDark])

	return (
		<StoreContext.Provider value={{ state, dispatch }}>
			{children}
		</StoreContext.Provider>
	)
}

export const useStore = () => useContext(StoreContext)
