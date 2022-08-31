import type { Story } from '@ladle/react'
import type { ComponentProps } from 'react'

import { object } from 'superstruct'

import { fieldEmail, fieldNumber, fieldPassword, fieldString } from 'validation/fields'

import { ButtonSolid } from 'components/Buttons'
import { Form } from 'components/Form'
import { FormWrapper } from 'components/Ladle'

import { Input } from '.'

export default {
	title: 'Fields/Input',
}

type DefaultProps = Story<Pick<ComponentProps<typeof Input>, 'hint' | 'isDisabled' | 'isFullWidth' | 'isRequired' | 'label' | 'name' | 'placeholder' | 'shouldAutofocus' | 'showOptionalHint' | 'type'> & {
	onSubmit: (fields: any) => void,
}>

export const Default: DefaultProps = ({ label, hint, type, isRequired, name, isDisabled, isFullWidth, placeholder, showOptionalHint, shouldAutofocus, onSubmit }) => (
	<Form
		onSubmit={(fields) => onSubmit(fields)}
		render={({ fieldProps }) => (
			<FormWrapper title='Default'>
				<Input
					{...fieldProps(name)}
					label={label}
					hint={hint}
					type={type}
					isRequired={isRequired}
					isDisabled={isDisabled}
					isFullWidth={isFullWidth}
					placeholder={placeholder}
					showOptionalHint={showOptionalHint}
					shouldAutofocus={shouldAutofocus}
				/>
				<ButtonSolid label='Submit' type='submit' />
			</FormWrapper>
		)}
	/>
)

Default.args = {
	name: 'input',
	label: 'Input label',
	hint: '',
	isRequired: false,
	isDisabled: false,
	isFullWidth: true,
	showOptionalHint: true,
	shouldAutofocus: false,
	placeholder: 'Placeholder text',
}

Default.argTypes = {
	type: {
		options: ['text', 'number', 'email', 'password', 'tel', 'username', 'multiline', 'hidden'],
		control: { type: 'select' },
		defaultValue: 'text',
	},
	onSubmit: {
		action: 'submitted',
	},
}

export const InferredBySchema = ({ onSubmit }: { onSubmit: (fields: any) => void }) => {
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
			onSubmit={(fields) => onSubmit(fields)}
			render={({ fieldProps }) => (
				<FormWrapper title='Required'>
					<Input {...fieldProps('input')} label='Required text' />
					<Input {...fieldProps('inputOptional')} label='Optional text' />
					<Input {...fieldProps('email')} label='Optional email' />
					<Input {...fieldProps('number')} label='Optional number' />
					<Input {...fieldProps('requiredNumber')} label='Required number' />
					<Input {...fieldProps('password')} label='Password' />
					<ButtonSolid label='Submit' type='submit' />
				</FormWrapper>
			)}
		/>
	)
}

InferredBySchema.argTypes = {
	onSubmit: {
		action: 'submitted',
	},
}
