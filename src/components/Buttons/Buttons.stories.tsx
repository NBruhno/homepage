import React from 'react'
import { action } from '@storybook/addon-actions'

import { delay } from 'lib/delay'

import { ButtonSolid } from '.'

export default {
	title: 'Buttons',
	decorators: [(story: any) => <div css={{ padding: '12px', display: 'flex', flexWrap: 'wrap' }}>{story()}</div>],
}

export const Solid = () => (
	<>
		<ButtonSolid label='Solid' onClick={action('onClick')} />
		<ButtonSolid label='Disabled' disabled onClick={action('onClick')} />
		<ButtonSolid label='Loading' isLoadingManual onClick={action('onClick')} />
		<ButtonSolid label='Delayed' minDelay={2} onClick={action('onClick')} />
		<ButtonSolid
			label='Async'
			onClick={async () => {
				await delay(2)
				console.log('onClick')
			}}
		/>
	</>
)
