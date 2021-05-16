import { ellipsis } from 'polished'

import * as allIcons from '.'

export default {
	title: 'Icons',
}

export const All = () => (
	<div css={{ display: 'flex', flexWrap: 'wrap' }}>
		{Object.entries(allIcons).map(([key, Icon]) => (
			<div
				css={(theme: Theme) => ({
					color: theme.color.text,
					fontSize: '11px',
					padding: '8px 8px 4px',
					textAlign: 'center',
					width: '80px',
				})}
				key={key}
			>
				<div>
					<Icon title={`<${key} />`} size={42} />
				</div>
				<span css={{ marginTop: '4px', ...ellipsis('80px') }} title={key}>
					{`<${key} />`}
				</span>
			</div>
		))}
	</div>
)
