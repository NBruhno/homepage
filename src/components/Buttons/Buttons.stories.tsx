import React, { useState } from 'react'
import { action } from '@storybook/addon-actions'

import { delay } from 'lib/delay'
import { logger } from 'lib/logger'

import { ButtonSolid, ButtonText, ButtonBorder, ButtonToggle } from '.'

export default {
	title: 'Buttons',
	decorators: [(story: any) => <div css={{ padding: '12px', display: 'grid', flexWrap: 'wrap', gridGap: '12px', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))' }}>{story()}</div>],
}

export const Solid = () => (
	<>
		<ButtonSolid label='Solid' onClick={action('onClick')} />
		<ButtonSolid label='Colored' backgroundColor='text' color='textInverted' onClick={action('onClick')} />
		<ButtonSolid label='Disabled' disabled onClick={action('onClick')} />
		<ButtonSolid label='Loading' isLoadingManual onClick={action('onClick')} />
		<ButtonSolid label='Delayed' minDelay={2} onClick={action('onClick')} />
		<ButtonSolid
			label='Async'
			onClick={async () => {
				await delay(2)
				logger.log('onClick')
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
				logger.log('onClick')
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
				logger.log('onClick')
			}}
		/>
	</>
)
export const Toggle = () => {
	const [active, setActive] = useState(false)

	return (
		<>
			<ButtonToggle label='Toggle' active={active} onClick={() => setActive(!active)} />
			<ButtonToggle label='Disabled' active={active} disabled onClick={() => setActive(!active)} />
			<ButtonToggle label='Loading' active={active} isLoadingManual onClick={() => setActive(!active)} />
			<ButtonToggle label='Delayed' active={active} minDelay={2} onClick={() => setActive(!active)} />
			<ButtonToggle
				label='Async'
				active={active}
				onClick={async () => {
					await delay(2)
					setActive(!active)
				}}
			/>
		</>
	)
}
