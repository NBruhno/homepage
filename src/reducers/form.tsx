import { useStore } from 'lib/store'

export const useForm = () => {
	const { state, dispatch } = useStore()
	return {
		form: state.form,
		update: (formName: string, form: Record<string, any>) => dispatch({ form: { [formName]: form } }),
		reset: (formName: string) => dispatch({ form: { [formName]: null } }),
	}
}
