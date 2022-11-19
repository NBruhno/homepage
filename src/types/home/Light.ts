export type Light = {
	id: string,
	name: string,
	lastChanged: string,
	lastUpdated: string,
	context: {
		id: string,
		userId: string | null,
		parentId: string | null,
	},
	isLightOn: boolean,
	rgbColor: [red: number, green: number, blue: number] | null,
} & ({
	type: 'light',
} | {
	type: 'room',
	lightsInRoom: Array<string>,
})
