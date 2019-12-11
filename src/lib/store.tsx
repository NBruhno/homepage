import { createContext, useContext } from 'react'

import { useReducer } from 'reinspect'

const StoreContext = createContext(undefined)
export const initialState = {
	count: 0,
	message: '',
}

const reducer = (_state: object, action: { type: string, message: string, payload: object }) => {
	if (action.payload) {
		return action.payload
	} else {
		throw new Error(`No payload specified for ${action.type}`)
	}
}

export const StoreProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState, ((state) => state), 'GLOBAL')

	return (
		<StoreContext.Provider value={{ state, dispatch }}>
			{children}
		</StoreContext.Provider>
	)
}

export const useStore = () => useContext(StoreContext)
