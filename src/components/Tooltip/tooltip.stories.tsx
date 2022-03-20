/* eslint-disable @typescript-eslint/naming-convention */
import { EmotionDecorator } from 'components/Ladle'

import { Tooltip } from '.'

export default {
	decorators: [
		(Story: React.FC) => <EmotionDecorator><Story /></EmotionDecorator>,
	],
}

export const Default = () => (
	<Tooltip tip='Tooltip message'>
		<p>Hey</p>
	</Tooltip>
)
