import type { ComponentProps } from 'react'

import { useTheme } from '@emotion/react'

type Props = ComponentProps<'svg'> & {
	size?: number,
	animationDuration?: number,
}

export const Spinner = ({ size = 50, animationDuration = 0.75, ...rest }: Props) => {
	const theme = useTheme()

	return (
		<svg width={size} height={size} viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' {...rest}>
			<path d='M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z' fill={theme.color.gray010} />
			<path d='M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z' fill={theme.color.gray080}>
				<animateTransform attributeName='transform' type='rotate' dur={`${animationDuration}s`} values='0 12 12;360 12 12' repeatCount='indefinite' />
			</path>
		</svg>
	)
}
