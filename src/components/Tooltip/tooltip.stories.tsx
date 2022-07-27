import type { Props as DefaultProps } from '.'
import type { Story } from '@ladle/react'

import { Card } from 'components/Card'

import { Tooltip } from '.'

export const Default: Story<Omit<DefaultProps, 'children'>> = ({ tip, show, position, timeToHover }) => (
	<Tooltip tip={tip} show={show} position={position} timeToHover={timeToHover}>
		<div css={{ margin: '42px auto', width: 'fit-content' }}>
			I have a tooltip if you hover me
		</div>
	</Tooltip>
)

Default.args = {
	tip: 'This is the tooltip text',
	show: true,
	timeToHover: 300,
}

Default.argTypes = {
	position: {
		options: ['top', 'right', 'bottom', 'left'],
		control: { type: 'select' },
		defaultValue: 'top',
	},
}

export const TipWithHTML = () => (
	<Tooltip
		tip={(
			<>
				<h2 css={{ marginTop: 0 }}>I am a <code>{'<h2 />'}</code></h2>
				<span>And I am a <code>{'<span />'}</code></span>
			</>
		)}
	>
		<div css={{ margin: '42px auto', width: 'fit-content' }}>
			I have a tooltip if you hover me
		</div>
	</Tooltip>
)

export const IgnoresOverflow = () => (
	<Card css={{ margin: '42px auto', padding: '22px', width: 'fit-content', overflow: 'hidden', position: 'relative', border: '1px solid red' }}>
		<Tooltip tip='I am at the root of the document'>
			<span>I have a tooltip if you hover me</span>
		</Tooltip>
	</Card>
)
