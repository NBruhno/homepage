import type { Story } from '@ladle/react'
import type { ComponentProps } from 'react'

import { logger } from 'lib/logger'

import { ButtonSolid } from 'components/Buttons'
import { Form } from 'components/Form'
import { FormWrapper } from 'components/Ladle'

import { Checkbox } from '.'

export default {
	title: 'Fields/Checkbox',
}

type DefaultProps = Story<Pick<ComponentProps<typeof Checkbox>, 'hint' | 'isDisabled' | 'isFullWidth' | 'label' | 'name'>>

export const Default: DefaultProps = ({ label, hint, name, isDisabled, isFullWidth }) => (
	<Form
		onSubmit={(fields) => logger.log(fields)}
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
