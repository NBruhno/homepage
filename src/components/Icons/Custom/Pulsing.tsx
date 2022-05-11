import type { Props } from '../Svg'

import { Svg } from '../Svg'

export const Pulsing = (props: Partial<Props>) => (
	<Svg title='Pulsing' type='mdi' x={40} y={40} {...props}>
		<circle cx='20' cy='20' fill='none' r='10' stroke='currentColor' strokeWidth='2'>
			<animate attributeName='r' from='8' to='20' dur='1.5s' begin='0s' repeatCount='indefinite' />
			<animate attributeName='opacity' from='1' to='0' dur='1.5s' begin='0s' repeatCount='indefinite' />
		</circle>
		<circle cx='20' cy='20' fill='currentColor' r='10' />
	</Svg>
)
