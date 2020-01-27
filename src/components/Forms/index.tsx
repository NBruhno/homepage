import { useEffect, useState, ReactNode } from 'react'
import { Form, FormSpy } from 'react-final-form'

import useForm from 'reducers/useForm'
import { FormApi, SubmissionErrors } from 'final-form'

const onPersistState = (
	values: object, valid: boolean, formName: string, persistState: string | boolean,
	updateFormState: (formName: string, values: object) => null,
) => {
	if (persistState === true) {
		return updateFormState(formName, values)
	}

	if (persistState === 'valid' && valid) {
		return updateFormState(formName, values)
	}
}

type Props = {
	onSubmit: (
		values: { initialStateValues: any },
		form: FormApi<{ initialStateValues: any }>,
		callback?: (errors?: SubmissionErrors) => void
	) => void | SubmissionErrors | Promise<any>,
	form: string,
	children: ReactNode,
	initialValues?: object,
	persistState?: string | boolean,
	destroyStateOnUnmount?: boolean,
	renderFormOnStateUpdate?: boolean,
	resetFormOnSubmitSuccess?: boolean,
}

const FinalForm = ({
	form: formName, onSubmit, initialValues, children, persistState,
	renderFormOnStateUpdate, destroyStateOnUnmount, resetFormOnSubmitSuccess, ...props
}: Props) => {
	const [initialStateValues, setInitialStateValues] = useState(null)
	const { form: globalFormState, update, reset } = useForm()

	const formState = persistState ? globalFormState[formName] : null

	useEffect(() => {
		// Set initialValues on mount
		if (persistState && formState) {
			setInitialStateValues(formState)
		}

		// Reset the form state if destroyStateOnUnmount is set
		return () => {
			if (destroyStateOnUnmount && formState) {
				reset(formName)
			}
		}
	}, [])

	// If renderFormOnStateUpdate is set, render the form on every state update
	useEffect(() => {
		if (renderFormOnStateUpdate && formState) {
			setInitialStateValues(formState)
		}
	}, [persistState, formState, renderFormOnStateUpdate])

	useEffect(() => {
	}, [])

	return (

		<Form
			onSubmit={onSubmit}
			initialValues={{ ...initialValues, ...initialStateValues }}

			{...props}

			render={({ handleSubmit, form }) => (
				<form
					id={formName}
					noValidate
					onSubmit={resetFormOnSubmitSuccess ? (
						async (event) => {
							await handleSubmit(event)
							form.reset()
						}
					) : (
						handleSubmit
					)}
				>
					{children}
					{persistState && (
						<FormSpy
							subscription={{ values: true, valid: true }}
							onChange={({ values, valid }) => onPersistState(values, valid, formName, persistState, update)}
						/>
					)}
				</form>
			)}
		/>
	)
}

export default FinalForm
