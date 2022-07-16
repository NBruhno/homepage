import type { Props } from '../Svg'

import { Svg } from '../Svg'

export const Close = (props: Partial<Props>) => (
	<Svg title='Close' {...props}>
		<line x1='18' y1='6' x2='6' y2='18' />
		<line x1='6' y1='6' x2='18' y2='18' />
	</Svg>
)
