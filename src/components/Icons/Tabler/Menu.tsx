import type { Props } from '../Svg'

import { Svg } from '../Svg'

export const Menu = (props: Partial<Props>) => (
	<Svg title='Menu' {...props}>
		<path stroke='none' d='M0 0h24v24H0z' fill='none' />
		<line x1='4' y1='6' x2='20' y2='6' />
		<line x1='4' y1='12' x2='20' y2='12' />
		<line x1='4' y1='18' x2='20' y2='18' />
	</Svg>
)
