import type { Props } from '../Svg'

import { Svg } from '../Svg'

export const HeartBroken = (props: Partial<Props>) => (
	<Svg title='Heart broken' {...props}>
		<path d='M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572' />
		<path d='M12 6l-2 4l4 3l-2 4v3' />
	</Svg>
)
