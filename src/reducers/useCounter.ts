import { useStore } from 'lib/store'

const useCounter = () => {
	const { state, dispatch } = useStore()
	return {
		count: state.count,
		message: state.message,
		increment: () => dispatch({ type: 'increment', message: 'Incremented' }),
		decrement: () => dispatch({ type: 'decrement', message: 'Decremented' }),
		reset: () => dispatch({ type: 'reset', message: 'Reset' }),
	}
}

export default useCounter
