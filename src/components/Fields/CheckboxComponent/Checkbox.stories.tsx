import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Form } from 'components/Form'
import { ButtonSolid } from 'components/Buttons'

import { Checkbox } from '..'

storiesOf('Fields/Checkbox', module)
	.addDecorator((story) => (
		<div css={{ maxWidth: '400px', padding: '12px' }}>
			<Form form='select' onSubmit={action('submit')}>
				{story()}
				<ButtonSolid label='Submit' submit />
			</Form>
		</div>
	))
	.add('Default', () => (<Checkbox name='Checkbox' label='Checkbox' />))
