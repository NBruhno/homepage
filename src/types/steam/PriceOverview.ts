export type SteamPriceOverview = Record<
	string,
	{
		success: boolean
		data:
			| {
					price_overview: {
						currency: string
						initial: number
						final: number
						discount_percent: number
						initial_formatted: string
						final_formatted: string
					}
			  }
			| Array<never>
	}
>
