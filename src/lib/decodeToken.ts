export const decodeToken = (token: string) => {
	try {
		return JSON.parse(atob(token.split('.')[1]))
	} catch (error) {
		return null
	}
}
