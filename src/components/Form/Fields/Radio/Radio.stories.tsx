import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Form } from 'components/Form'
import { ButtonSolid } from 'components/Buttons'

import { Radio } from '.'

storiesOf('Fields/Radio', module)
	.addDecorator((story) => (
		<div css={{ maxWidth: '400px', padding: '12px' }}>
			<Form form='select' onSubmit={action('submit')}>
				{story()}
				<ButtonSolid label='Submit' submit />
			</Form>
		</div>
	))
	.add('Default', () => (<Radio name='radio' options={[{ label: 'One', value: 1 }, { label: 'Two', value: 2 }, { label: 'Three', value: 3 }]} />))
