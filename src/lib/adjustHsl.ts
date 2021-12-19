type Values = {
	hue?: number,
	saturation?: `${number}%`,
	light?: `${number}%`,
	alpha?: number,
}

/** Takes a regular hsl() string and returns a hsl() string based on the modification in Values */
export const adjustHsl = (hsl: string, { hue: newHue, saturation: newSaturation, light: newLight, alpha: newAlpha }: Values = {}) => {
	// Finds and groups the values from a hsl (with or without alpha channel)
	const colors = /hsl\(\s*(\d+)\s*,\s*(\d+(?:\.\d+)?%)\s*,\s*(\d+(?:\.\d+)?%)(?:\s*,\s*(0(?:\.\d+)?|1(\.0+)?))?\)/g.exec(hsl)
	if (colors) {
		const [, hue = newHue, saturation = newSaturation, light = newLight, alpha = newAlpha] = colors
		return `hsl(${hue!}, ${saturation!}, ${light!}${(alpha) ? `, ${alpha}`: ''})`
	} else {
		throw Error(`Invalid hsl(*) string; ${hsl}`)
	}
}
