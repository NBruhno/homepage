import { useStore } from 'lib/store'

export const useForm = () => {
	const { state, dispatch } = useStore()
	return {
		form: state.forms,
		update: (formName: string, form: Record<string, any>) => dispatch({ forms: { [formName]: form } }),
		reset: (formName: string) => dispatch({ forms: { [formName]: null } }),
	}
}
