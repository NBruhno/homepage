import type { Props } from '../Svg'

import { Svg } from '../Svg'

export const GitLab = (props: Partial<Props>) => (
	<Svg title='GitLab' {...props}>
		<path stroke='none' d='M0 0h24v24H0z' fill='none' />
		<path d='M21 14l-9 7l-9 -7l3 -11l3 7h6l3 -7z' />
	</Svg>
)
