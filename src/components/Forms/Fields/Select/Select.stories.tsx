import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'

import { ButtonSolid } from 'components/Buttons'
import { Form } from 'components/Forms'

import { Select } from '.'

storiesOf('Fields/Select', module)
	.addDecorator((story) => (
		<div css={{ maxWidth: '400px', padding: '12px' }}>
			<Form form='select' onSubmit={action('submit')}>
				{story()}
				<ButtonSolid label='Submit' submit />
			</Form>
		</div>
	))
	.add('Default', () => (
		<>
			<Select name='select' label='Select' hint='This is a hint' required options={[{ label: 'One', value: 'One' }, { label: 'Two', value: 'Two' }, { label: 'Three', value: 'Three' }]} />
		</>
	))
