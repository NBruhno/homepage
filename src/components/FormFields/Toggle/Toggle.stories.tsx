import type { Story } from '@ladle/react'
import type { ComponentProps } from 'react'

import { logger } from 'lib/logger'

import { ButtonSolid } from 'components/Buttons'
import { Form } from 'components/Form'
import { FormWrapper } from 'components/Ladle'

import { Toggle } from '.'

export default {
	title: 'Fields/Toggle',
}

type DefaultProps = Story<Pick<ComponentProps<typeof Toggle>, 'hint' | 'isDisabled' | 'isFullWidth' | 'label' | 'name'>>

export const Default: DefaultProps = ({ label, hint, name, isDisabled, isFullWidth }) => (
	<Form
		onSubmit={(fields) => logger.log(fields)}
		render={({ fieldProps }) => (
			<FormWrapper title='Default'>
				<Toggle
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
	name: 'toggle',
	label: 'Toggle label',
	hint: '',
	isDisabled: false,
	isFullWidth: true,
}
