import { useEffect, useState } from 'react'
import { Form as FinalForm, FormSpy } from 'react-final-form'
import { SubmissionErrors, FormApi } from 'final-form'

import { useGlobalState } from 'states/globalState'

const onPersistState = (
	values: object, valid: boolean, persistState: string | boolean,
	updateFormState: (values: Record<string, any>) => void,
) => {
	if (persistState === true) {
		return updateFormState(values)
	}

	if (persistState === 'valid' && valid) {
		return updateFormState(values)
	}
}

type Props = {
	form: string,
	children: React.ReactNode,
	initialValues?: object,
	persistState?: string | boolean,
	persistStateOnSubmit?: boolean,
	destroyStateOnUnmount?: boolean,
	renderFormOnStateUpdate?: boolean,
	resetFormOnSubmitSuccess?: boolean,
	onSubmit: (values: any, form: FormApi<any>) => void | SubmissionErrors | Promise<any>,
}

export const Form = ({
	form: formName, onSubmit, initialValues, children, persistState, persistStateOnSubmit,
	renderFormOnStateUpdate, destroyStateOnUnmount, resetFormOnSubmitSuccess, ...props
}: Props) => {
	const [initialStateValues, setInitialStateValues] = useState(null)
	const [formsState, setFormsState] = useGlobalState('forms')
	const updateFormsState = (form: Record<string, any>) => setFormsState({ ...formsState, [formName]: form })

	const formState = (persistState || persistStateOnSubmit) ? formsState?.[formName] : null

	useEffect(() => {
		// Set initialValues on mount
		if ((persistState || persistStateOnSubmit) && formState) {
			setInitialStateValues(formState)
		}

		// Reset the form state if destroyStateOnUnmount is set
		return () => {
			if (destroyStateOnUnmount && formState) {
				setFormsState({ ...formsState, [formName]: null })
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
	}, [persistState, persistStateOnSubmit, formState, renderFormOnStateUpdate])

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
							onChange={({ values, valid }) => onPersistState(values, valid, persistState, updateFormsState)}
						/>
					)}
					{persistStateOnSubmit && (
						<FormSpy
							subscription={{ values: true, valid: true, submitSucceeded: true, dirtySinceLastSubmit: true }}
							onChange={({ values, valid, dirtySinceLastSubmit, submitSucceeded }) => {
								if (submitSucceeded && !dirtySinceLastSubmit) {
									onPersistState(values, valid, persistState || persistStateOnSubmit, updateFormsState)
								}
							}}
						/>
					)}
				</form>
			)}
		/>
	)
}
