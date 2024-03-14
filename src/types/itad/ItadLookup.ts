/* eslint-disable @typescript-eslint/naming-convention */

export type ItadLookup = {
	found: boolean,
	game: {
		/** UUID */
		id: string,
		slug: string,
		title: string,
		type: string | null,
		mature: boolean,
	} | undefined,
}
