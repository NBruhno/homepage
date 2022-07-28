import type { Story } from '@ladle/react'
import type { ComponentProps } from 'react'

import { logger } from 'lib/logger'

import { ButtonSolid } from 'components/Buttons'
import { Form } from 'components/Form'
import { FormWrapper } from 'components/Ladle'

import { MultiSelect } from '.'

export default {
	title: 'Fields/MultiSelect',
}

const options = Array.from({ length: 100 }).map((_, index) => ({
	label: `Option ${index + 1}`,
	value: index + 1,
}))

type DefaultProps = Story<Omit<ComponentProps<typeof MultiSelect>, 'options'>>

export const Default: DefaultProps = ({ label, hint, isRequired, name, isDisabled, isFullWidth, placeholder, showOptionalHint, shouldAutofocus }) => (
	<Form
		onSubmit={(fields) => logger.log(fields)}
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
	showOptionalHint: true,
	shouldAutofocus: false,
	placeholder: 'Placeholder text',
}
