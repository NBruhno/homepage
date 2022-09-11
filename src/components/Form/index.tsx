import type { ReactNode, BaseSyntheticEvent } from 'react'
import type { CriteriaMode, DeepPartial, FieldPath, FieldPathValue, FieldValues, UseFormReturn, ValidationMode } from 'react-hook-form'
import type { Struct } from 'superstruct'
import type { AnyStruct, StructSchema } from 'superstruct/lib/utils'
import type { Promisable } from 'type-fest'

import { superstructResolver } from '@hookform/resolvers/superstruct'
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import { useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'

import type { Forms } from 'states/page'
import { useFormStore } from 'states/page'

import { useUnique } from 'lib/hooks'

import { inferFieldType } from './inferFieldType'

type RenderProps<T extends FieldValues> = UseFormReturn<T, object> & {
	/** A type-safe way to add a name to a field. Checks if the field name exists in the provided model */
	name: (name: FieldPath<T>) => keyof T,
	fieldProps: (name: FieldPath<T>) => {
		name: string,
		isRequired: boolean,
		type: 'email' | 'number' | 'password' | undefined,
	},
}

type Props<T extends FieldValues> = {
	/**
	 * Superstruct schema for validation. The schema is then in turn used by the `fieldProps` function to set the relevant
	 * type and validation for each field if applicable.
	 * @example
	 * ```tsx
	 * const schema = object({
	 * 	text: fieldString(),
	 * 	number: fieldNumber({ isOptional: true }),
	 * })
	 *
	 * <Form
	 * 	schema={schema}
	 * 	onSubmit={(fields) => console.log(fields)}
	 * 	render={({ fieldProps }) => (
	 * 		<>
	 * 			<Input {...fieldProps('text')} label='Required string' />
	 * 			<Input {...fieldProps('number')} label='Optional number' />
	 * 			<button type='submit'>Submit</button>
	 * 		</>
	 * 	)}
	 * />
	 * ```
	 */
	schema?: Struct<T, StructSchema<T>>,
	/** Avoid setting values to `undefined` intentionally. Prefer `null` instead if it has to be defined without a value. */
	initialValues?: DeepPartial<T>,
	/** Changes when validation is done. The prop is described [here](https://react-hook-form.com/api/useform) */
	validationMode?: keyof ValidationMode,
	/** Changes when validation is done **after** the user has submitted. The prop is described [here](https://react-hook-form.com/api/useform) */
	reValidateMode?: 'onBlur' | 'onChange' | 'onSubmit',
	/** Decided if it is only the first error from each field that will be gathered or all of their errors */
	criteriaMode?: CriteriaMode,
	/** Wether or not to focus the first error in the form if any */
	shouldFocusError?: boolean,

	/** If you want to submit programmatically, use the `handleSubmit` from `render()` and set this to `() => undefined` */
	onSubmit: (fields: T, event: BaseSyntheticEvent | undefined) => Promisable<any>,
	/**
	 * This is where you will place all your fields. That way, the form has the right context.
	 * Returns all available functions from `useForm` and some extra utility functions.
	 */
	render: (props: RenderProps<T>) => ReactNode,
} & (
	// State management
	{
		/** The name of the form should match the available `Forms` defined in `states/page/useFormStore` or not set at all */
		name: keyof Forms,
		/** The form state will be saved to `useFormStore` every time an input changes */
		shouldPersistStateOnChange?: boolean,
		/** The form state will be saved to `useFormStore` every time the user submits the form without validation errors */
		shouldPersistStateOnSubmit?: boolean,
		/**
	 * The input fields will stay in sync with the form state defined in `useFormStore`.
	 * **It does NOT work with persistance to state**. If you want to update something in the form programmatically and
	 * persist to state at the same time, use the provided `setValue` from `render`
	 */
		shouldUpdateFieldsOnStateChange?: boolean,
		/** Resets the form state in `useFormStore` when the form is un-mounted */
		shouldResetStateOnUnMount?: boolean,
		/** Resets the form state in `useFormStore` when the form is submitted without validation errors */
		shouldResetStateOnSubmitSuccess?: boolean,
	} | {
		name?: never,
		shouldPersistStateOnChange?: false,
		shouldPersistStateOnSubmit?: false,
		shouldUpdateFieldsOnStateChange?: false,
		shouldResetStateOnUnMount?: false,
		shouldResetStateOnSubmitSuccess?: false,
	}
)

/**
 * A simple `<form>` component using react-hook-form. Accepts a `onSubmit` function and a `render` function
 * which returns the `register` function to register the individual fields by name.
 * @example
 * ```tsx
 * type Model = {
 * 	text: string,
 * 	number: number,
 * }
 *
 * <Form<Model>
 * 	onSubmit={(fields) => console.log(fields)}
 * 	render={({ fieldProps, name }) => (
 * 		<>
 * 			<input {...fieldProps('text')} />
 * 			<Input name={name('number')} type='number' label='Number' required />
 * 			<button type='submit'>Submit</button>
 * 		</>
 * 	)}
 * />
 * ```
 */
export const Form = <T extends FieldValues>({
	name, render, onSubmit, schema, validationMode = 'onSubmit', reValidateMode = 'onChange', initialValues, criteriaMode,
	shouldPersistStateOnChange = false, shouldPersistStateOnSubmit = false, shouldResetStateOnUnMount = false,
	shouldResetStateOnSubmitSuccess = false, shouldUpdateFieldsOnStateChange = false, shouldFocusError = true,
}: Props<T>) => {
	const uniqueName = useUnique()
	const resolver = schema ? superstructResolver(schema) : undefined
	const methods = useForm<T>({
		resolver,
		defaultValues: initialValues,
		mode: validationMode,
		reValidateMode,
		criteriaMode,
		shouldFocusError,
	})

	const { setValue, handleSubmit, watch } = methods
	const formState = useFormStore((state) => name ? state[name] : undefined)
	const setFormState = useFormStore((state) => state.setFormState)
	const resetFormState = useFormStore((state) => state.resetFormState)
	const formValues = watch()

	useEffect(() => {
		// Updates the form state if enabled and if it has changed
		if (shouldPersistStateOnChange && !isEqual(formValues, formState) && name) setFormState(name, formValues)
		// If enabled, clears the form-state on unmount
		return () => (shouldResetStateOnUnMount && name) ? resetFormState(name) : undefined
	}, [shouldPersistStateOnChange, formValues, shouldResetStateOnUnMount, name])

	useEffect(() => {
		// If enabled and it does not already persist on change, it will update all fields to be in sync with the form state
		if (shouldUpdateFieldsOnStateChange && !shouldPersistStateOnChange && formState) {
			Object.entries(formState).forEach(([key, value]) => {
				const fieldName = key as FieldPath<T>
				const fieldValue = value as FieldPathValue<T, FieldPath<T>>
				if (!isEqual(formValues[fieldName], fieldValue)) setValue(fieldName, fieldValue)
			})
		}
	}, [shouldUpdateFieldsOnStateChange, shouldPersistStateOnChange, formState, setValue, formValues])

	return (
		<FormProvider {...methods}>
			<form
				name={name ?? uniqueName}
				onSubmit={handleSubmit(async (fields, event) => {
					await onSubmit(fields, event)
					if (shouldPersistStateOnSubmit && name) setFormState(name, formValues)
					if (shouldResetStateOnSubmitSuccess && name) resetFormState(name)
					event?.preventDefault()
				})}
				noValidate
			>
				{render({
					...methods,
					name: (name) => name,
					fieldProps: (name) => {
						const struct = get(schema?.schema, name) as AnyStruct | undefined
						return ({
							name,
							isRequired: !struct?.type.includes('Optional'),
							type: inferFieldType(struct),
						})
					},
				})}
			</form>
		</FormProvider>
	)
}
