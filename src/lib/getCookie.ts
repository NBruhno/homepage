export const getCookie = (name: string) => {
	const match = new RegExp('(^| )' + name + '=([^;]+)').exec(document.cookie)
	if (match) {
		return match[2]
	} else {
		return undefined
	}
}
