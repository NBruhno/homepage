import { useStore } from 'lib/store'

export const ACTIONS = {
	UPDATE: 'UPDATE',
	RESET: 'RESET',
}

const useForm = () => {
	const { state, dispatch } = useStore()
	return {
		form: state.form,
		update: (formName: string, form: object) => dispatch({ type: ACTIONS.UPDATE, payload: { form: { [formName]: form } } }),
		reset: (formName: string) => dispatch({ type: ACTIONS.RESET, payload: { form: { [formName]: null } } }),
	}
}

export default useForm
