import type { Props } from '../Svg'

import { Svg } from '../Svg'

export const Spy = (props: Partial<Props>) => (
	<Svg title='Spy' {...props}>
		<path d='M3 11h18' />
		<path d='M5 11v-4a3 3 0 0 1 3 -3h8a3 3 0 0 1 3 3v4' />
		<circle cx='7' cy='17' r='3' />
		<circle cx='17' cy='17' r='3' />
		<path d='M10 17h4' />
	</Svg>
)
