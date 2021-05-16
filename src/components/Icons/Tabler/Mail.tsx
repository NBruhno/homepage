import type { Props } from '../Svg'

import { Svg } from '../Svg'

export const Mail = (props: Partial<Props>) => (
	<Svg title='Mail' {...props}>
		<path stroke='none' d='M0 0h24v24H0z' fill='none' />
		<rect x='3' y='5' width='18' height='14' rx='2' />
		<polyline points='3 7 12 13 21 7' />
	</Svg>
)
