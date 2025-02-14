import { styled } from 'styled-components'

type Props = {
	isActive?: boolean
	isBold?: boolean
	isHorizontal: boolean
	isSlim?: boolean
	shouldMirror?: boolean
}

const ChevronLine = styled.span`
	background-color: currentColor;
	bottom: 0.1em;
	position: absolute;
	width: 0.6em;
	transition: transform 150ms ${({ theme }) => theme.animation.default};
`

export const Line = ({ isSlim, isBold, shouldMirror, isActive, isHorizontal, ...rest }: Props) => {
	let size = 0.1

	if (isSlim) {
		size = 0.05
	} else if (isBold) {
		size = 0.15
	}

	const verticalTransform = `translateY(${isActive ? -0.4 : 0}em) rotate(${-90 + (shouldMirror ? -1 : 1) * (isActive ? 135 : 45)}deg)`
	const isHorizontalTransform = `translateY(${isActive ? -0.4 : -0.4}em) rotate(${0 + (shouldMirror ? -1 : 1) * (isActive ? 135 : 45)}deg)`

	return (
		<ChevronLine
			style={{
				borderRadius: `${size / 2}em`,
				height: `${size}em`,
				left: `${0.7 - size / 2}em`,
				transform: isHorizontal ? isHorizontalTransform : verticalTransform,
				transformOrigin: `${size / 2}em ${size / 2}em`,
			}}
			{...rest}
		/>
	)
}
