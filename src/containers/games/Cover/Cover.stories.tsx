import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Form } from 'components/Forms'
import { ButtonSolid } from 'components/Buttons'

import { Cover } from '.'

storiesOf('Games/Cover', module)
	.addDecorator((story) => (
		<div css={{ maxWidth: '400px', padding: '12px' }}>
			<Form form='Cover' onSubmit={action('submit')}>
				{story()}
				<ButtonSolid label='Submit' submit />
			</Form>
		</div>
	))
	.add('Default', () => (
		<>
			<Cover />
		</>
	))
