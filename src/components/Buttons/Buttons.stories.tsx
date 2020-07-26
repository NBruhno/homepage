import React from 'react'
import { action } from '@storybook/addon-actions'

import { delay } from 'lib/delay'

import { ButtonSolid, ButtonText, ButtonBorder } from '.'

export default {
	title: 'Buttons',
	decorators: [(story: any) => <div css={{ padding: '12px', display: 'flex', flexWrap: 'wrap', '> button': { marginRight: '12px' } }}>{story()}</div>],
}

export const Solid = () => (
	<>
		<ButtonSolid label='Solid' onClick={action('onClick')} />
		<ButtonSolid label='Plain' plain onClick={action('onClick')} />
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
export const Text = () => (
	<>
		<ButtonText label='Text' onClick={action('onClick')} />
		<ButtonText label='Disabled' disabled onClick={action('onClick')} />
		<ButtonText label='Loading' isLoadingManual onClick={action('onClick')} />
		<ButtonText label='Delayed' minDelay={2} onClick={action('onClick')} />
		<ButtonText
			label='Async'
			onClick={async () => {
				await delay(2)
				console.log('onClick')
			}}
		/>
	</>
)
export const Border = () => (
	<>
		<ButtonBorder label='Border' onClick={action('onClick')} />
		<ButtonBorder label='Disabled' disabled onClick={action('onClick')} />
		<ButtonBorder label='Loading' isLoadingManual onClick={action('onClick')} />
		<ButtonBorder label='Delayed' minDelay={2} onClick={action('onClick')} />
		<ButtonBorder
			label='Async'
			onClick={async () => {
				await delay(2)
				console.log('onClick')
			}}
		/>
	</>
)
