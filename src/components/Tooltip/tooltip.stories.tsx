import type { Story } from '@ladle/react'
import type { Props as DefaultProps } from '.'

import { Card } from 'components/Card'

import { Tooltip } from '.'

export const Default: Story<Omit<DefaultProps, 'children'>> = ({ tip, position }) => (
	<Tooltip
		tip={tip}
		position={position}
		render={(props) => (
			<div {...props} style={{ margin: '42px auto', width: 'fit-content' }}>
				I have a tooltip if you hover me
			</div>
		)}
	/>
)

Default.args = {
	tip: 'This is the tooltip text',
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
		tip={
			<div>
				<h2 style={{ marginTop: 0 }}>
					I am a <code>{'<h2 />'}</code>
				</h2>
				<span>
					And I am a <code>{'<span />'}</code>
				</span>
			</div>
		}
		render={(props) => (
			<div {...props} style={{ margin: '42px auto', width: 'fit-content' }}>
				I have a tooltip if you hover me
			</div>
		)}
	/>
)

export const IgnoresOverflow = () => (
	<Card style={{ overflow: 'hidden', position: 'relative', textAlign: 'center', border: '1px solid red' }}>
		<Tooltip
			tip='I am at the root of the document'
			render={(props) => <span {...props}>I have a tooltip if you hover me</span>}
		/>
	</Card>
)
