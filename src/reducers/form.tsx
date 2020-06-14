import { useStore } from 'lib/store'

const useForm = () => {
	const { state, dispatch } = useStore()
	return {
		form: state.form,
		update: (formName: string, form: object) => dispatch({ form: { [formName]: form } }),
		reset: (formName: string) => dispatch({ form: { [formName]: null } }),
	}
}

export default useForm
