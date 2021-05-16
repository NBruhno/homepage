import type { Props } from '../Svg'

import { Svg } from '../Svg'

export const Alert = (props: Partial<Props>) => (
	<Svg title='Alert' {...props}>
		<path stroke='none' d='M0 0h24v24H0z' fill='none' />
		<circle cx='12' cy='12' r='9' />
		<line x1='12' y1='8' x2='12' y2='12' />
		<line x1='12' y1='16' x2='12.01' y2='16' />
	</Svg>
)
