import type { ComponentPropsWithoutRef } from 'react'

import { useTheme } from '@emotion/react'

type Props = ComponentPropsWithoutRef<'footer'> & {
	isTransparent: boolean,
}

export const Container = ({ isTransparent, ...rest }: Props) => {
	const theme = useTheme()

	return (
		<footer
			style={{
				backgroundColor: isTransparent ? 'transparent' : theme.color.background,
			}}
			css={(theme) => ({
				borderTop: isTransparent ? 'none' : `1px solid ${theme.color.border}`,
				bottom: 0,
				color: isTransparent ? theme.color.white : theme.color.text,
				height: '72px',
				marginTop: 'auto',
				padding: '12px 24px',
				verticalAlign: 'bottom',

				[theme.mediaQueries.maxMobile]: {
					textAlign: 'center',
				},
			})}
			{...rest}
		/>
	)
}
