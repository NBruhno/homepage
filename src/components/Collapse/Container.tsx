import type { ComponentProps } from 'react'

type Props = ComponentProps<'div'> & {
	shouldFill?: boolean,
	transitionTime?: number,
	isAnimated?: boolean,
}

export const Container = ({ isAnimated, transitionTime = 0, shouldFill, ...rest }: Props) => (
	<div
		css={[
			{
				overflow: 'hidden',
				transition: `${isAnimated ? `height ${transitionTime}s` : 'none'}`,
			},
			shouldFill ? {
				display: 'flex',
				flexDirection: 'column',
				flexGrow: 1,
			} : undefined,
		]}
		{...rest}
	/>
)
