import type { Props } from '../Svg'

import { Svg } from '../Svg'

export const Gamepad = (props: Partial<Props>) => (
	<Svg title='Gamepad' {...props}>
		<path stroke='none' d='M0 0h24v24H0z' fill='none' />
		<rect x='2' y='6' width='20' height='12' rx='2' />
		<path d='M6 12h4m-2 -2v4' />
		<line x1='15' y1='11' x2='15' y2='11.01' />
		<line x1='18' y1='13' x2='18' y2='13.01' />
	</Svg>
)
