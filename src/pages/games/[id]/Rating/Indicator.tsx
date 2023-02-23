import type { ComponentPropsWithoutRef } from 'react'

import { useTheme } from '@emotion/react'
import { IconMinus, IconThumbDown, IconThumbUp } from '@tabler/icons-react'
import { useMemo } from 'react'

import { adjustHsl } from 'lib/client'

type Props = ComponentPropsWithoutRef<'div'> & {
	rating: number,
}

export const Indicator = ({ rating, children, ...rest }: Props) => {
	const theme = useTheme()
	const reviewState = useMemo(() => {
		if (rating >= 70) {
			return {
				color: theme.color.success,
				icon: <IconThumbUp size={28} strokeWidth={1.5} />,
			}
		}
		if (rating < 40) {
			return {
				color: theme.color.error,
				icon: <IconThumbDown size={28} strokeWidth={1.5} />,
			}
		}
		return {
			color: theme.color.primary,
			icon: <IconMinus size={28} />,
		}
	}, [rating, theme])

	return (
		<div
			css={(theme) => ({
				minWidth: '38px',
				minHeight: '38px',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				borderRadius: '2px',
				color: reviewState.color,
				fontWeight: theme.font.weight.medium,
				fontFamily: theme.font.family.poppins,
				fontSize: theme.font.size.s140,
				backgroundColor: adjustHsl(reviewState.color, { alpha: 0.2 }),
			})}
			{...rest}
		>
			{children ?? reviewState.icon}
		</div>
	)
}
