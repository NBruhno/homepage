import { ellipsis } from 'polished'

import * as icons from '.'

export default {
	title: 'Icons',
}

export const All = () => (
	<div css={{ display: 'flex', flexWrap: 'wrap' }}>
		{Object.entries(icons).map(([key, Icon]) => (
			<div
				css={(theme: Theme) => ({
					color: theme.color.text,
					fontSize: '12px',
					padding: '8px 8px 4px',
					textAlign: 'center',
					width: '80px',
				})}
				key={key}
			>
				<div><Icon size={42} /></div>
				<span css={{ marginTop: '4px', ...ellipsis('80px') }} title={key}>{key}</span>
			</div>
		))}
	</div>
)
