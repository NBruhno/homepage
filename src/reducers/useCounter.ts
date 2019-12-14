import { useStore } from 'lib/store'

export const ACTIONS = {
	INCREMENT: 'INCREMENT',
	DECREMENT: 'DECREMENT',
	RESET: 'RESET',
}

const useCounter = () => {
	const { state, dispatch } = useStore()
	return {
		count: state.count,
		message: state.message,
		increment: () => dispatch({ type: ACTIONS.INCREMENT, payload: { count: state.count + 1, message: 'Incremented' } }),
		decrement: () => dispatch({ type: ACTIONS.DECREMENT, payload: { count: state.count - 1, message: 'Decremented' } }),
		reset: () => dispatch({ type: ACTIONS.RESET, payload: { count: 0, message: 'Reset' } }),
	}
}

export default useCounter
