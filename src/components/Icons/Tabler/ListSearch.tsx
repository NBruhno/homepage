import type { Props } from '../Svg'

import { Svg } from '../Svg'

export const ListSearch = (props: Partial<Props>) => (
	<Svg title='List search' {...props}>
		<path stroke='none' d='M0 0h24v24H0z' fill='none' />
		<circle cx='15' cy='15' r='4' />
		<path d='M18.5 18.5l2.5 2.5' />
		<path d='M4 6h16' />
		<path d='M4 12h4' />
		<path d='M4 18h4' />
	</Svg>
)
