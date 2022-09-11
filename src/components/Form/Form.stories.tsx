import { action } from '@ladle/react'
import { object } from 'superstruct'

import { fieldEmail, fieldNumber, fieldPassword, fieldString } from 'validation/fields'

import { ButtonSolid } from 'components/Buttons'
import { Input } from 'components/FormFields'
import { FormWrapper } from 'components/Ladle'

import { Form } from '.'

export default {
	title: 'Form fields',
}

export const InferredBySchema = () => {
	const schema = object({
		input: fieldString(),
		inputOptional: fieldString({ isOptional: true }),
		email: fieldEmail({ isOptional: true }),
		number: fieldNumber({ isOptional: true }),
		requiredNumber: fieldNumber(),
		password: fieldPassword(),
	})

	return (
		<Form
			schema={schema}
			onSubmit={(fields) => action('Submit')(fields)}
			render={({ fieldProps }) => (
				<FormWrapper title='Required'>
					<Input {...fieldProps('input')} label='Required text' />
					<Input {...fieldProps('inputOptional')} label='Optional text' />
					<Input {...fieldProps('email')} label='Optional email' />
					<Input {...fieldProps('email')} label='Required email' />
					<Input {...fieldProps('number')} label='Optional number' />
					<Input {...fieldProps('requiredNumber')} label='Required number' />
					<Input {...fieldProps('password')} label='Password' />
					<ButtonSolid label='Submit' type='submit' />
				</FormWrapper>
			)}
		/>
	)
}

export const PersistOnChange = () => {
	const schema = object({
		input: fieldString(),
		inputOptional: fieldString({ isOptional: true }),
		email: fieldEmail({ isOptional: true }),
		number: fieldNumber({ isOptional: true }),
		requiredNumber: fieldNumber(),
		password: fieldPassword(),
	})

	return (
		<Form
			schema={schema}
			onSubmit={(fields) => action('Submit')(fields)}
			render={({ fieldProps }) => (
				<FormWrapper title='Required'>
					<Input {...fieldProps('input')} label='Required text' />
					<Input {...fieldProps('inputOptional')} label='Optional text' />
					<Input {...fieldProps('email')} label='Optional email' />
					<Input {...fieldProps('email')} label='Required email' />
					<Input {...fieldProps('number')} label='Optional number' />
					<Input {...fieldProps('requiredNumber')} label='Required number' />
					<Input {...fieldProps('password')} label='Password' />
					<ButtonSolid label='Submit' type='submit' />
				</FormWrapper>
			)}
		/>
	)
}
