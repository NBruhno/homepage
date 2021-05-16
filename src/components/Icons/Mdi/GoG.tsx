import type { Props } from '../Svg'

import { mdiGog } from '@mdi/js'

import { Svg } from '../Svg'

export const GoG = (props: Partial<Props>) => (
	<Svg title='GoG' type='mdi' {...props}>
		<path fill='currentColor' d={mdiGog} />
	</Svg>
)
