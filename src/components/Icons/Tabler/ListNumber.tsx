import type { Props } from '../Svg'

import { Svg } from '../Svg'

export const ListNumber = (props: Partial<Props>) => (
	<Svg title='List number' {...props}>
		<path stroke='none' d='M0 0h24v24H0z' fill='none' />
		<path d='M11 6h9' />
		<path d='M11 12h9' />
		<path d='M12 18h8' />
		<path d='M4 16a2 2 0 1 1 4 0c0 .591 -.5 1 -1 1.5l-3 2.5h4' />
		<path d='M6 10v-6l-2 2' />
	</Svg>
)
