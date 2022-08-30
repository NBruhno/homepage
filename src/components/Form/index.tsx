import type { ReactNode, BaseSyntheticEvent } from 'react'
import type { DeepPartial, FieldPath, FieldPathValue, FieldValues, UseFormReturn, ValidationMode } from 'react-hook-form'
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
	/** The name of the form should match the available `Forms` defined in `states/page/useFormStore` */
	name?: keyof Forms,
	/**
	 * Superstruct schema for validation. The schema created for validation can be used as the `Model` type for the form
	 * @example
	 * ```ts
	 * const schema = object({
	 * 	text: string(),
	 * 	number: number(),
	 * })
	 * export type Model = Infer<typeof schema>
	 * ```
	 */
	schema?: Struct<T, StructSchema<T>>,
	/** Changes when validation is done. The prop is described [here](https://react-hook-form.com/api/useform) */
	validationMode?: keyof ValidationMode,
	/** Avoid setting values to `undefined` intentionally. Prefer `null` instead. */
	initialValues?: DeepPartial<T>,

	// State management
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

	/** If you want to submit programmatically, use the `handleSubmit` from `render()` and set this to `() => undefined` */
	onSubmit: (fields: T, event: BaseSyntheticEvent | undefined) => Promisable<any>,
	/**
	 * This is where you will place all your fields. That way, the form has the right context.
	 * Returns all available functions from `useForm` and some extra utility functions.
	 */
	render: (props: RenderProps<T>) => ReactNode,
}

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
 * 			<Input name={name('number')} type='number' label='Number' />
 * 			<button type='submit'>Submit</button>
 * 		</>
 * 	)}
 * />
 * ```
 */
export const Form = <T extends FieldValues>({
	name, render, onSubmit, schema, validationMode = 'onSubmit', initialValues,
	shouldPersistStateOnChange = false, shouldPersistStateOnSubmit = false, shouldResetStateOnUnMount = false,
	shouldResetStateOnSubmitSuccess = false, shouldUpdateFieldsOnStateChange = false,
}: Props<T>) => {
	const resolver = schema ? superstructResolver(schema) : undefined
	const methods = useForm<T>({
		resolver,
		mode: validationMode,
		defaultValues: initialValues,
	})

	const formState = useFormStore((state) => name ? state[name] : undefined)
	const setFormState = useFormStore((state) => state.setFormState)
	const resetFormState = useFormStore((state) => state.resetFormState)
	const formValues = methods.watch()

	useEffect(() => {
		// Updates the form state if enabled and if it has changed
		if (shouldPersistStateOnChange && !isEqual(formValues, formState) && name) setFormState(name, formValues)
		// If enabled, clears the form-state on unmount
		return () => (shouldResetStateOnUnMount && name) ? resetFormState(name) : undefined
	}, [shouldPersistStateOnChange, formValues, shouldResetStateOnUnMount])

	useEffect(() => {
		// If enabled and it does not already persist on change, it will update all fields to be in sync with the form state
		if (shouldUpdateFieldsOnStateChange && !shouldPersistStateOnChange && formState) {
			Object.entries(formState).forEach(([key, value]) => {
				const fieldName = key as FieldPath<T>
				const fieldValue = value as FieldPathValue<T, FieldPath<T>>
				if (!isEqual(formValues[fieldName], fieldValue)) methods.setValue(fieldName, fieldValue)
			})
		}
	}, [shouldUpdateFieldsOnStateChange, formState, methods])

	return (
		<FormProvider {...methods}>
			<form
				name={name}
				onSubmit={methods.handleSubmit(async (fields, event) => {
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
