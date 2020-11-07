import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'

import { ButtonSolid } from 'components/Buttons'
import { Form } from 'components/Forms'

import { Toggle } from '.'

storiesOf('Fields/Toggle', module)
	.addDecorator((story) => (
		<div css={{ maxWidth: '400px', padding: '12px' }}>
			<Form form='select' onSubmit={action('submit')}>
				{story()}
				<ButtonSolid label='Submit' submit />
			</Form>
		</div>
	))
	.add('Default', () => (<Toggle name='Toggle' label='Toggle' />))
