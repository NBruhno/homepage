import type { Props } from '../Svg'

import { Svg } from '../Svg'

export const ChevronRight = (props: Partial<Props>) => (
	<Svg title='ChevronRight' {...props}>
		<path stroke='none' d='M0 0h24v24H0z' fill='none' />
		<polyline points='9 6 15 12 9 18' />
	</Svg>
)
