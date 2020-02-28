import React from 'react'
import { css } from '@emotion/core'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { ButtonSolid } from '.'

const Container = ({ ...rest }) => (
	<div
		css={css`
			max-width: 400px;
			padding: 12px;
		`}
		{...rest}
	/>
)

const FieldWrapper = ({ children }) => (
	<Container>
		{children}
	</Container>
)

storiesOf('Buttons', module)
	.addDecorator((story) => <FieldWrapper>{story()}</FieldWrapper>)
	.add('Solid', () => (
		<>
			<ButtonSolid label='Solid' onClick={action('onClick')} />
			<ButtonSolid label='Loading' isLoadingManual onClick={action('onClick')} />
			<ButtonSolid label='Async' minDelay={2} onClick={action('onClick')} />
		</>
	))
