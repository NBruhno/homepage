import type { Props } from '../Svg'

import { Svg } from '../Svg'

export const UserOff = (props: Partial<Props>) => (
	<Svg title='User off' {...props}>
		<path stroke='none' d='M0 0h24v24H0z' fill='none' />
		<path d='M14.274 10.291a4 4 0 1 0 -5.554 -5.58m-.548 3.453a4.01 4.01 0 0 0 2.62 2.65' />
		<path d='M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 1.147 .167m2.685 2.681a4 4 0 0 1 .168 1.152v2' />
		<line x1='3' y1='3' x2='21' y2='21' />
	</Svg>
)
