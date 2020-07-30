import { useStore } from 'lib/store'

export const useCounter = () => {
	const { state, dispatch } = useStore()
	return {
		count: state.count,
		increment: () => dispatch({ count: state.count + 1 }),
		decrement: () => dispatch({ count: state.count - 1 }),
		reset: () => dispatch({ count: 0, message: 'Reset' }),
	}
}
