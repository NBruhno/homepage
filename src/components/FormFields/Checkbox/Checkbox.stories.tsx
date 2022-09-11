import type { Story } from '@ladle/react'
import type { ComponentProps } from 'react'

import { ButtonSolid } from 'components/Buttons'
import { Form } from 'components/Form'
import { FormWrapper } from 'components/Ladle'

import { Checkbox } from '.'

export default {
	title: 'Form fields/Checkbox',
}

type DefaultProps = Story<Pick<ComponentProps<typeof Checkbox>, 'hint' | 'isDisabled' | 'isFullWidth' | 'label' | 'name'> & {
	onSubmit: (fields: any) => void,
}>

export const Default: DefaultProps = ({ label, hint, name, isDisabled, isFullWidth, onSubmit }) => (
	<Form
		shouldFocusError
		onSubmit={(fields) => onSubmit(fields)}
		render={({ fieldProps }) => (
			<FormWrapper title='Default'>
				<Checkbox
					{...fieldProps(name)}
					label={label}
					hint={hint}
					isDisabled={isDisabled}
					isFullWidth={isFullWidth}
				/>
				<ButtonSolid label='Submit' type='submit' />
			</FormWrapper>
		)}
	/>
)

Default.args = {
	name: 'checkbox',
	label: 'Checkbox label',
	hint: '',
	isDisabled: false,
	isFullWidth: true,
}

Default.argTypes = {
	onSubmit: {
		action: 'submitted',
	},
}
