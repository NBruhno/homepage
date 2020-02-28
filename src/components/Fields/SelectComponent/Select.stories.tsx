import React from 'react'
import { css } from '@emotion/core'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Select from '.'
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
		<Form form='select' onSubmit={action('submit')}>
			{children}
			<button type='submit'>Submit</button>
		</Form>
	</Container>
)

storiesOf('Fields/Select', module)
	.addDecorator((story) => <FieldWrapper>{story()}</FieldWrapper>)
	.add('Default', () => (
		<Select name='select' label='Select' required options={[{ label: 'One', value: 1 }, { label: 'Two', value: 2 }, { label: 'Three', value: 3 }]} />
	))
