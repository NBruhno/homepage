type Props = {
	bold?: boolean,
	isActive?: boolean,
	mirror?: boolean,
	horizontal: boolean,
	slim?: boolean,
} & React.ComponentProps<'span'>

export const Line = ({ slim, bold, mirror, isActive, horizontal, ...rest }: Props) => {
	let size = 0.1

	if (slim) {
		size = 0.05
	} else if (bold) {
		size = 0.15
	}

	const verticalTransform = `translateY(${isActive ? -0.4 : 0}em) rotate(${-90 + (mirror ? -1 : 1) * (isActive ? 135 : 45)}deg)`
	const horizontalTransform = `translateY(${isActive ? -0.4 : -0.40}em) rotate(${0 + (mirror ? -1 : 1) * (isActive ? 135 : 45)}deg)`

	return (
		<span
			css={(theme: Theme) => ({
				backgroundColor: 'currentColor',
				borderRadius: `${size / 2}em`,
				bottom: '0.1em',
				height: `${size}em`,
				left: `${0.7 - size / 2}em`,
				position: 'absolute',
				transform: horizontal ? horizontalTransform : verticalTransform,
				transformOrigin: `${size / 2}em ${size / 2}em`,
				transition: `transform 300ms ${theme.animation.default}`,
				width: '0.6em',
			})}
			{...rest}
		/>
	)
}
