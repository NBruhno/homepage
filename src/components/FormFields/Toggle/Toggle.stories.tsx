import type { Story } from '@ladle/react'
import type { ComponentProps } from 'react'

import { useState } from 'react'

import { delay } from 'lib/delay'

import { ButtonSolid } from 'components/Buttons'
import { Form } from 'components/Form'
import { FormWrapper } from 'components/Ladle'

import { ToggleButton } from './Button'

import { Toggle } from '.'

export default {
	title: 'Form fields/Toggle',
}

type DefaultProps = Story<Pick<ComponentProps<typeof Toggle>, 'hint' | 'isDisabled' | 'isFullWidth' | 'label' | 'name'> & {
	onSubmit: (fields: any) => void,
}>

export const Default: DefaultProps = ({ label, hint, name, isDisabled, isFullWidth, onSubmit }) => (
	<Form
		onSubmit={(fields) => onSubmit(fields)}
		render={({ fieldProps }) => (
			<FormWrapper title='Default'>
				<Toggle
					{...fieldProps(name)}
					label={label}
					hint={hint}
					isDisabled={isDisabled}
					isFullWidth={isFullWidth}
				/>
				<Toggle
					{...fieldProps(name)}
					label={label}
					hint={hint}
					isDisabled={isDisabled}
					isFullWidth={isFullWidth}
				/>
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

Default.argTypes = {
	onSubmit: {
		action: 'submitted',
	},
}

export const ButtonType = () => {
	const [isChecked, setIsChecked] = useState(false)

	return (
		<ToggleButton
			label='Toggle button'
			onClick={async () => {
				await delay(2)
				setIsChecked(!isChecked)
			}}
			isChecked={isChecked}
		/>
	)
}

export const ButtonTypeFails = () => (
	<ToggleButton
		label='Toggle button'
		onClick={async () => {
			await delay(2)
			throw new Error('Oh no!')
		}}
		isChecked={false}
	/>
)
