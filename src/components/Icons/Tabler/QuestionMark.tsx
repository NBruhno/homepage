import type { Props } from '../Svg'

import { Svg } from '../Svg'

export const QuestionMark = (props: Partial<Props>) => (
	<Svg title='Question mark' {...props}>
		<path stroke='none' d='M0 0h24v24H0z' fill='none' />
		<path d='M8 8a3.5 3 0 0 1 3.5 -3h1a3.5 3 0 0 1 3.5 3a3 3 0 0 1 -2 3a3 4 0 0 0 -2 4' />
		<line x1='12' y1='19' x2='12' y2='19.01' />
	</Svg>
)
