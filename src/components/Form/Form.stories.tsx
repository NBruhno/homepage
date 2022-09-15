import { action } from '@ladle/react'
import { useState } from 'react'
import { object } from 'superstruct'

import { useFormStore } from 'states/page'

import { fieldEmail, fieldNumber, fieldPassword, fieldString, fieldUsername } from 'validation/fields'

import { ButtonBorder, ButtonSolid } from 'components/Buttons'
import { Card } from 'components/Card'
import { Input } from 'components/FormFields'
import { FormWrapper, JsonWrapper } from 'components/Ladle'

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
		accessCode: fieldString(),
		email: fieldEmail(),
		username: fieldUsername(),
		password: fieldPassword(),
	})

	const registerFormState = useFormStore((state) => state.register)
	const [isFormMounted, setIsFormMounted] = useState(true)

	return (
		<>
			{isFormMounted && (
				<Form
					name='register'
					schema={schema}
					onSubmit={(fields) => action('Submit')(fields)}
					shouldPersistStateOnChange
					render={({ fieldProps }) => (
						<FormWrapper title='Required'>
							<Input label='Access code' {...fieldProps('accessCode')} />
							<Input label='Email' {...fieldProps('email')} type='email' autoComplete='email' />
							<Input label='Display name' {...fieldProps('username')} autoComplete='username' />
							<Input label='Password' {...fieldProps('password')} autoComplete='password' />
							<ButtonSolid label='Submit' type='submit' />
						</FormWrapper>
					)}
				/>
			)}
			<Card>
				<h3 css={{ marginTop: 0 }}>Form state</h3>
				<JsonWrapper data={registerFormState} name='register' />
				<ButtonBorder label={isFormMounted ? 'Dismount form' : 'Remount form'} css={{ marginTop: '12px' }} onClick={() => setIsFormMounted(!isFormMounted)} />
			</Card>
		</>
	)
}

export const PersistOnSubmit = () => {
	const schema = object({
		accessCode: fieldString(),
		email: fieldEmail(),
		username: fieldUsername(),
		password: fieldPassword(),
	})

	const registerFormState = useFormStore((state) => state.register)
	const [isFormMounted, setIsFormMounted] = useState(true)

	return (
		<>
			{isFormMounted && (
				<Form
					name='register'
					schema={schema}
					onSubmit={(fields) => action('Submit')(fields)}
					shouldPersistStateOnSubmit
					render={({ fieldProps }) => (
						<FormWrapper title='Required'>
							<Input label='Access code' {...fieldProps('accessCode')} />
							<Input label='Email' {...fieldProps('email')} type='email' autoComplete='email' />
							<Input label='Display name' {...fieldProps('username')} autoComplete='username' />
							<Input label='Password' {...fieldProps('password')} autoComplete='password' />
							<ButtonSolid label='Submit' type='submit' />
						</FormWrapper>
					)}
				/>
			)}
			<Card>
				<h3 css={{ marginTop: 0 }}>Form state</h3>
				<JsonWrapper data={registerFormState} name='register' />
				<ButtonBorder label={isFormMounted ? 'Dismount form' : 'Remount form'} css={{ marginTop: '12px' }} onClick={() => setIsFormMounted(!isFormMounted)} />
			</Card>
		</>
	)
}

export const UpdateFromGlobalState = () => {
	const schema = object({
		accessCode: fieldString(),
		email: fieldEmail(),
		username: fieldUsername(),
		password: fieldPassword(),
	})

	const setFormState = useFormStore((state) => state.setFormState)
	const registerFormState = useFormStore((state) => state.register)

	const [isFormMounted, setIsFormMounted] = useState(true)

	return (
		<>
			{isFormMounted && (
				<Form
					name='register'
					schema={schema}
					onSubmit={(fields) => action('Submit')(fields)}
					shouldUpdateFieldsOnStateChange
					render={({ fieldProps }) => (
						<FormWrapper title='Required'>
							<Input label='Access code' {...fieldProps('accessCode')} />
							<Input label='Email' {...fieldProps('email')} type='email' autoComplete='email' />
							<Input label='Display name' {...fieldProps('username')} autoComplete='username' />
							<Input label='Password' {...fieldProps('password')} autoComplete='password' />
							<ButtonSolid label='Submit' type='submit' />
						</FormWrapper>
					)}
				/>
			)}
			<Card>
				<h3 css={{ marginTop: 0 }}>Form state</h3>
				<JsonWrapper data={registerFormState} name='register' />
				<div css={{ marginTop: '12px', display: 'flex', columnGap: '12px' }}>
					<ButtonBorder label={isFormMounted ? 'Dismount form' : 'Remount form'} onClick={() => setIsFormMounted(!isFormMounted)} />
					<ButtonBorder
						label='Update state'
						onClick={() => setFormState('register', {
							accessCode: 'ABCD1234',
						})}
					/>
				</div>
			</Card>
		</>
	)
}

export const UpdateAndPersistOnChange = () => {
	const schema = object({
		accessCode: fieldString(),
		email: fieldEmail(),
		username: fieldUsername(),
		password: fieldPassword(),
	})

	const registerFormState = useFormStore((state) => state.register)

	const [isFormMounted, setIsFormMounted] = useState(true)

	return (
		<>
			{isFormMounted && (
				<Form
					name='register'
					schema={schema}
					onSubmit={(fields) => action('Submit')(fields)}
					shouldPersistStateOnChange
					render={({ fieldProps, setValue }) => (
						<FormWrapper title='Required'>
							<Input label='Access code' {...fieldProps('accessCode')} />
							<Input label='Email' {...fieldProps('email')} type='email' autoComplete='email' />
							<Input label='Display name' {...fieldProps('username')} autoComplete='username' />
							<Input label='Password' {...fieldProps('password')} autoComplete='password' />
							<div css={{ marginTop: '12px', display: 'flex', columnGap: '12px' }}>
								<ButtonSolid label='Submit' type='submit' />
								<ButtonBorder
									label='Update state'
									onClick={() => setValue('accessCode', 'ABCD1234')}
								/>
							</div>
						</FormWrapper>
					)}
				/>
			)}
			<Card>
				<h3 css={{ marginTop: 0 }}>Form state</h3>
				<JsonWrapper data={registerFormState} name='register' />

				<ButtonBorder label={isFormMounted ? 'Dismount form' : 'Remount form'} css={{ marginTop: '12px' }} onClick={() => setIsFormMounted(!isFormMounted)} />
			</Card>
		</>
	)
}

export const ResetStateOnDismount = () => {
	const schema = object({
		accessCode: fieldString(),
		email: fieldEmail(),
		username: fieldUsername(),
		password: fieldPassword(),
	})

	const registerFormState = useFormStore((state) => state.register)
	const [isFormMounted, setIsFormMounted] = useState(true)

	return (
		<>
			{isFormMounted && (
				<Form
					name='register'
					schema={schema}
					onSubmit={(fields) => action('Submit')(fields)}
					shouldResetStateOnDismount
					render={({ fieldProps }) => (
						<FormWrapper title='Required'>
							<Input label='Access code' {...fieldProps('accessCode')} />
							<Input label='Email' {...fieldProps('email')} type='email' autoComplete='email' />
							<Input label='Display name' {...fieldProps('username')} autoComplete='username' />
							<Input label='Password' {...fieldProps('password')} autoComplete='password' />
							<ButtonSolid label='Submit' type='submit' />
						</FormWrapper>
					)}
				/>
			)}
			<Card>
				<h3 css={{ marginTop: 0 }}>Form state</h3>
				<JsonWrapper data={registerFormState} name='register' />
				<ButtonBorder label={isFormMounted ? 'Dismount form' : 'Remount form'} css={{ marginTop: '12px' }} onClick={() => setIsFormMounted(!isFormMounted)} />
			</Card>
		</>
	)
}
