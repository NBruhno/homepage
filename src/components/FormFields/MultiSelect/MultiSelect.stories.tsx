import type { Story } from '@ladle/react'
import type { ComponentProps } from 'react'

import { ButtonSolid } from 'components/Buttons'
import { Form } from 'components/Form'
import { FormWrapper } from 'components/Ladle'

import { MultiSelect } from '.'

export default {
	title: 'Form fields/MultiSelect',
}

const options = Array.from({ length: 100 }).map((_, index) => ({
	label: `Option ${index + 1}`,
	value: index + 1,
	isDisabled: index % 7 === 0,
}))

type DefaultProps = Story<Omit<ComponentProps<typeof MultiSelect>, 'options'> & { onSubmit: (value: any) => void }>

export const Default: DefaultProps = ({ label, hint, isRequired, name, isDisabled, isFullWidth, isLoading, placeholder, showOptionalHint, shouldAutofocus, onSubmit }) => (
	<Form
		onSubmit={(fields) => onSubmit(fields)}
		render={({ fieldProps }) => (
			<FormWrapper title='Default'>
				<MultiSelect
					{...fieldProps(name)}
					label={label}
					hint={hint}
					options={options}
					isRequired={isRequired}
					isDisabled={isDisabled}
					isFullWidth={isFullWidth}
					isLoading={isLoading}
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
	name: 'multiSelect',
	label: 'Multi select label',
	hint: '',
	isRequired: false,
	isDisabled: false,
	isFullWidth: true,
	isLoading: false,
	showOptionalHint: true,
	shouldAutofocus: false,
	placeholder: 'Placeholder text',
}

Default.argTypes = {
	onSubmit: {
		action: 'submitted',
	},
}
