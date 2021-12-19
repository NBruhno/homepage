import type { SubmissionErrors, FormApi } from 'final-form'
import type { ReactNode } from 'react'

import { useEffect, useState } from 'react'
import { Form as FinalForm, FormSpy } from 'react-final-form'

import { useGlobalState } from 'states/global'

const onPersistState = (
	values: object, isValid: boolean, persistState: boolean | string,
	updateFormState: (values: Record<string, any>) => void,
) => {
	if (persistState === true) {
		return updateFormState(values)
	}

	if (persistState === 'valid' && isValid) {
		return updateFormState(values)
	}
}

type Props<T> = {
	name: string,
	children: ReactNode,
	initialValues?: object,
	persistState?: boolean | string,
	shouldPersistStateOnSubmit?: boolean,
	shouldDestroyStateOnUnMount?: boolean,
	shouldRenderFormOnStateUpdate?: boolean,
	shouldResetFormOnSubmitSuccess?: boolean,
	onSubmit: (values: T, form: FormApi<any>) => Promise<any> | SubmissionErrors,
}

export const Form = <T extends Record<string, any>>({
	name, onSubmit, initialValues, children, persistState, shouldPersistStateOnSubmit,
	shouldRenderFormOnStateUpdate, shouldDestroyStateOnUnMount, shouldResetFormOnSubmitSuccess, ...props
}: Props<T>) => {
	const [initialStateValues, setInitialStateValues] = useState<Record<string, any> | null>(null)
	const [formsState, setFormsState] = useGlobalState('forms')
	const updateFormsState = (form: Record<string, any>) => setFormsState({ ...formsState, [name]: form })

	const formState = (persistState || shouldPersistStateOnSubmit) ? formsState[name] : null

	useEffect(() => {
		// Set initialValues on mount
		if ((persistState || shouldPersistStateOnSubmit) && formState) {
			setInitialStateValues(formState)
		}

		// Reset the form state if shouldDestroyStateOnUnMount is set
		return () => {
			if (shouldDestroyStateOnUnMount && formState) {
				setFormsState({ ...formsState, [name]: {} })
			}
		}
	// The effect is intended to only run on mount and dismount
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// If shouldRenderFormOnStateUpdate is set, render the form on every state update
	useEffect(() => {
		if (shouldRenderFormOnStateUpdate && formState) {
			setInitialStateValues(formState)
		}
	}, [persistState, shouldPersistStateOnSubmit, formState, shouldRenderFormOnStateUpdate, formsState])

	return (

		<FinalForm
			onSubmit={onSubmit}
			initialValues={{ ...initialValues, ...initialStateValues }}
			{...props}
			render={({ handleSubmit, form, hasValidationErrors, hasSubmitErrors }) => (
				<form
					id={name}
					noValidate
					onSubmit={shouldResetFormOnSubmitSuccess ? (
						async (event) => {
							await handleSubmit(event)
							if (hasValidationErrors || hasSubmitErrors) return
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
							onChange={({ values, valid: isValid }) => onPersistState(values, isValid, persistState, updateFormsState)}
						/>
					)}
					{shouldPersistStateOnSubmit && (
						<FormSpy
							subscription={{ values: true, valid: true, submitSucceeded: true, dirtySinceLastSubmit: true }}
							onChange={({ values, valid: isValid, dirtySinceLastSubmit: isDirtySinceLastSubmit, submitSucceeded: didSubmissionSucceeded }) => {
								if (didSubmissionSucceeded && !isDirtySinceLastSubmit) {
									onPersistState(values, isValid, true, updateFormsState)
								}
							}}
						/>
					)}
				</form>
			)}
		/>
	)
}
