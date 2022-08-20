import type { Props } from '../Svg'

import { Svg } from '../Svg'

export const Heart = (props: Partial<Props>) => (
	<Svg title='Heart' {...props}>
		<path d='M19.5 12.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572' />
	</Svg>
)
