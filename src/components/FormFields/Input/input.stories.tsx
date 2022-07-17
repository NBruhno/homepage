import type { Story } from '@ladle/react'
import type { ComponentProps, ReactNode } from 'react'

import isEmpty from 'lodash/isEmpty'
import { useFormContext } from 'react-hook-form'
import { number, object, optional, string } from 'superstruct'

import { email, message } from 'validation/shared'

import { logger } from 'lib/logger'

import { ButtonSolid } from 'components/Buttons'
import { Card } from 'components/Card'
import { Form } from 'components/Form'

import { Input } from '.'

const Title = ({ children }: { children: ReactNode }) => (
	<h3 css={{ margin: '16px 0 2px' }}>{children}</h3>
)

const JsonWrapper = ({ children }: { children: ReactNode }) => (
	<pre
		css={(theme) => ({
			minHeight: '100px',
			padding: '12px 24px',
			backgroundColor: theme.color.gray020,
			color: theme.color.text,
			borderRadius: '12px',
		})}
	>
		{children}
	</pre>
)

const FormWrapper = <T extends Record<string, number | string | undefined>>({ title, children }: { title: string, children: ReactNode }) => {
	const { formState, getValues } = useFormContext<T>()
	const values = getValues()

	return (
		<>
			<h1>{title}</h1>
			<div
				css={(theme) => ({
					display: 'grid',
					gridTemplateColumns: '1fr 1fr',
					columnGap: '16px',
					[theme.mediaQueries.maxDesktop]: {
						gridTemplateColumns: 'auto',
					},
				})}
			>
				<Card>{children}</Card>
				<Card>
					<Title>Values</Title>
					<JsonWrapper>
						{!isEmpty(values) && JSON.stringify(values, null, 2)}
					</JsonWrapper>
					<Title>Errors</Title>
					<JsonWrapper>
						{!isEmpty(formState.errors) && (
							<>
								{'{\n'}
								{Object.entries(formState.errors).map(([key, value]: [key: string, value: { message: string } | undefined]) => (
									`  "${key}": ${value?.message ? `"${value.message}"` : 'undefined'},\n`
								))}
								{'}'}
							</>
						)}
					</JsonWrapper>
				</Card>
			</div>
		</>
	)
}

export default {
	title: 'FormFields/Input',
}

type DefaultProps = Story<Pick<ComponentProps<typeof Input>, 'hint' | 'isDisabled' | 'isFullWidth' | 'isRequired' | 'label' | 'name' | 'placeholder' | 'shouldAutofocus' | 'showOptionalHint' | 'type'>>

export const Default: DefaultProps = ({ label, hint, type, isRequired, name, isDisabled, isFullWidth, placeholder, showOptionalHint, shouldAutofocus }) => (
	<Form
		onSubmit={(fields) => logger.log(fields)}
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
}

export const InferredRequired = () => {
	const schema = object({
		input: message(string(), { message: 'This field is required' }),
		email: optional(email()),
		number: optional(message(number(), { message: 'Has to be a number' })),
	})

	return (
		<Form
			schema={schema}
			onSubmit={(fields) => logger.log(fields)}
			render={({ fieldProps }) => (
				<FormWrapper title='Required'>
					<Input {...fieldProps('input')} label='Required text' />
					<Input {...fieldProps('email')} label='Optional email' />
					<Input {...fieldProps('number')} label='Optional number' type='number' />
					<ButtonSolid label='Submit' type='submit' />
				</FormWrapper>
			)}
		/>
	)
}
