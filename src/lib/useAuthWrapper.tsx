export type Props = {
	action?: string,
	body?: object,
	headers?: HeadersInit,
	method?: RequestInit['method'],
	mode?: RequestMode,
	url: string,
}

export const useAuthWrapper = (firebase: Record<string, any>) => {
	const authWrapper = async ({ url, body, method = 'GET', mode = 'cors', headers }: Props) => {
		const result = await firebase.auth().currentUser.getIdToken(false).then(async (token: string) => {
			try {
				const response = await fetch(url, {
					method,
					mode,
					body: body ? JSON.stringify(body) : undefined,
					headers: headers || new Headers({
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					}),
				})
				if (response.status < 300) {
					return { data: response.json(), loading: false, error: false }
				}
				console.error(response)
				return { data: null, loading: false, error: true }
			} catch (fetchError) {
				console.error(fetchError)
				return { data: null, loading: false, error: true }
			}
		})

		return result
	}

	return authWrapper
}
