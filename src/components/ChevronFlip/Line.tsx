import type { ComponentPropsWithoutRef } from 'react'

type Props = ComponentPropsWithoutRef<'span'> & {
	isActive?: boolean,
	isBold?: boolean,
	isHorizontal: boolean,
	isSlim?: boolean,
	shouldMirror?: boolean,
}

export const Line = ({ isSlim, isBold, shouldMirror, isActive, isHorizontal, ...rest }: Props) => {
	let size = 0.1

	if (isSlim) {
		size = 0.05
	} else if (isBold) {
		size = 0.15
	}

	const verticalTransform = `translateY(${isActive ? -0.4 : 0}em) rotate(${-90 + (shouldMirror ? -1 : 1) * (isActive ? 135 : 45)}deg)`
	const isHorizontalTransform = `translateY(${isActive ? -0.4 : -0.40}em) rotate(${0 + (shouldMirror ? -1 : 1) * (isActive ? 135 : 45)}deg)`

	return (
		<span
			css={(theme) => ({
				backgroundColor: 'currentColor',
				borderRadius: `${size / 2}em`,
				bottom: '0.1em',
				height: `${size}em`,
				left: `${0.7 - size / 2}em`,
				position: 'absolute',
				transform: isHorizontal ? isHorizontalTransform : verticalTransform,
				transformOrigin: `${size / 2}em ${size / 2}em`,
				transition: `transform 300ms ${theme.animation.default}`,
				width: '0.6em',
			})}
			{...rest}
		/>
	)
}
