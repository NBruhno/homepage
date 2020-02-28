import { css } from '@emotion/core'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Input from '.'
import Form from 'components/Form'

const Container = (props) => (
	<div
		css={css`
			max-width: 400px;
			padding: 12px;
		`}
		{...props}
	/>
)

const FieldWrapper = ({ children }) => (
	<Container>
		<Form form='input' onSubmit={action('submit')}>
			{children}
			<button type='submit'>Submit</button>
		</Form>
	</Container>
)

storiesOf('Fields/Input', module)
	.addDecorator((story) => <FieldWrapper>{story()}</FieldWrapper>)
	.add('All types', () => (
		<>
			<Input name='text' label='Text' />
			<Input name='number' label='Number' type='number' />
			<Input name='tel' label='Tel' type='tel' />
			<Input name='email' label='Email' type='email' />
			<Input name='password' label='Password' type='password' />
			<Input name='multiline' label='Multiline' type='multiline' />
		</>
	))
	.add('Default', () => (<Input name='input' label='Input' />))
	.add('Required', () => (<Input name='input' label='Input' required />))
	.add('Multiline', () => (<Input name='input' label='Input' type='multiline' />))
	.add('Number', () => (<Input name='input' label='Input' />))
