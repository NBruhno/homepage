import styled from 'styles/theme'

export default styled('span')<{ slim?: boolean, bold?: boolean, mirror?: boolean, isActive?: boolean }>(({ slim, bold, mirror, isActive }) => {
	let size = 0.1

	if (slim) {
		size = 0.05
	} else if (bold) {
		size = 0.15
	}

	return (`
		position: absolute;
		bottom: 0.1em;
		width: 0.6em;
		background-color: currentColor;
		transition: transform 0.15s;

		height: ${size}em;
		border-radius: ${size / 2}em;
		transform-origin: ${size / 2}em ${size / 2}em;
		left: ${0.7 - size / 2}em;

		transform: translateY(${isActive ? -0.4 : 0}em) rotate(${-90 + (mirror ? -1 : 1) * (isActive ? 135 : 45)}deg)
	`)
})
