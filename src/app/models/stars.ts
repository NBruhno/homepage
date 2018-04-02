export interface Stars {
	isFetching?: boolean
	count?: number
	error?: boolean
	message?: any
}

export interface StarsAction {
	type: string
	payload?: {
		count?: number
		message?: any
	}
}
