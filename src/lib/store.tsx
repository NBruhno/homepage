import { createContext, useContext, useReducer } from 'react'

const StoreContext = createContext(undefined)
export const initialState: {
	count: number,
	darkTheme: boolean,
	user: {
		accessToken?: string,
		shouldRefresh: boolean,
	},
	test: Record<any, any>,
	tests: Record<any, any>,
	task: Record<any, any>,
	tasks: Record<any, any>,
} = {
	count: 0,
	darkTheme: true,
	user: {
		accessToken: undefined,
		shouldRefresh: false,
	},

	test: { data: undefined, loading: true, error: undefined },
	tests: { data: [], loading: true, error: undefined },

	task: { data: undefined, loading: true, error: undefined },
	tasks: { data: [], loading: true, error: undefined },
}

const reducer = (state: Record<string, any>, payload: Record<string, any>) => {
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

	return (
		<StoreContext.Provider value={{ state, dispatch }}>
			{children}
		</StoreContext.Provider>
	)
}

export const useStore = () => useContext(StoreContext)
