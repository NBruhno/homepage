import type { Props } from '../Svg'

import { Svg } from '../Svg'

export const ChevronLeft = (props: Partial<Props>) => (
	<Svg title='ChevronLeft' {...props}>
		<path stroke='none' d='M0 0h24v24H0z' fill='none' />
		<polyline points='15 6 9 12 15 18' />
	</Svg>
)
