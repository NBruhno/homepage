export const getCookie = (name: string) => {
	const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
	if (match) {
		return match[2]
	} else {
		return undefined
	}
}
