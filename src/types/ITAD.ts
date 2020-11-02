/* eslint-disable camelcase */

export type Shop = {
	id: string,
	name: string,
}

export enum Drm {
	Steam = 'steam',
	Free = 'DRM Free',
	GoG = 'gog',
}

export type Plain = {
	'.meta': Record<string, any>,
	data: {
		plain: string,
	},
}

export type Prices = {
	'.meta': {
		currency: string,
	},
	data: Record<string, {
		list: Array<{
			price_new: number,
			price_old: number,
			price_cut: number,
			url: string,
			shop: Shop,
			drm: Drm,
		}>,
	}>,
	urls: {
		game: string,
	},
}
