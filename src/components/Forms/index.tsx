import { useEffect, useState } from 'react'
import { Form as FinalForm, FormSpy } from 'react-final-form'
import { SubmissionErrors, FormApi } from 'final-form'

import { useForm } from 'reducers/form'

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
	form: string,
	children: React.ReactNode,
	initialValues?: object,
	persistState?: string | boolean,
	destroyStateOnUnmount?: boolean,
	renderFormOnStateUpdate?: boolean,
	resetFormOnSubmitSuccess?: boolean,
	onSubmit: (values: any, form: FormApi<any>) => void | SubmissionErrors | Promise<any>,
}

export const Form = ({
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
	// The effect is intended to only run on mount and dismount
	// eslint-disable-next-line react-hooks/exhaustive-deps
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

		<FinalForm
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
