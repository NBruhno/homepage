import type { Props } from '../Svg'

import { Svg } from '../Svg'

export const YouTube = (props: Partial<Props>) => (
	<Svg title='YouTube' {...props}>
		<path stroke='none' d='M0 0h24v24H0z' fill='none' />
		<rect x='3' y='5' width='18' height='14' rx='4' />
		<path d='M10 9l5 3l-5 3z' />
	</Svg>
)
