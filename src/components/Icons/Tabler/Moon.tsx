import type { Props } from '../Svg'

import { Svg } from '../Svg'

export const Moon = (props: Partial<Props>) => (
	<Svg title='Moon' {...props}>
		<path stroke='none' d='M0 0h24v24H0z' fill='none' />
		<path d='M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z' />
	</Svg>
)
