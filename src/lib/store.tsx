import { createContext, useContext } from 'react'

import { StateInspector, useReducer } from 'reinspect'

const StoreContext = createContext(undefined)
const initialState = { count: 0, message: '' }

const reducer = (state: any, action: { type: string, message: string }) => {
	switch (action.type) {
		case 'increment':
			return {
				count: state.count + 1,
				message: action.message,
			}
		case 'decrement':
			return {
				count: state.count - 1,
				message: action.message,
			}
		case 'reset':
			return {
				count: 0,
				message: action.message,
			}
		default:
			throw new Error(`Unhandled action type: ${action.type}`)
	}
}

export const StoreProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState, 'state')

	return (
		<StateInspector initialState={initialState}>
			<StoreContext.Provider value={{ state, dispatch }}>
				{children}
			</StoreContext.Provider>
		</StateInspector>
	)
}

export const useStore = () => useContext(StoreContext)
