/* eslint-disable @typescript-eslint/naming-convention */
import { EmotionDecorator } from 'components/Ladle'

import { Logo } from '.'

export default {
	decorators: [
		(Story: React.FC) => <EmotionDecorator><Story /></EmotionDecorator>,
	],
}

export const Default = () => <Logo />
