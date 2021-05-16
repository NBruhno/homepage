import type { Props } from '../Svg'

import { Svg } from '../Svg'

export const User = (props: Partial<Props>) => (
	<Svg title='User' {...props}>
		<path stroke='none' d='M0 0h24v24H0z' fill='none' />
		<circle cx='12' cy='7' r='4' />
		<path d='M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2' />
	</Svg>
)
