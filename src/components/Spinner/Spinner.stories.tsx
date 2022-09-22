import type { Story } from '@ladle/react'
import type { ComponentProps } from 'react'

import { Spinner } from '.'

type DefaultProps = Story<Pick<ComponentProps<typeof Spinner>, 'animationDuration' | 'size'> & {
	onSubmit: (fields: any) => void,
}>

export const Default: DefaultProps = ({ size, animationDuration }) => <Spinner size={size} animationDuration={animationDuration} />

Default.args = {
	size: 50,
	animationDuration: 2,
}
