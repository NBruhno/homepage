import { filterUnspecified } from './filterUnspecified'

/** Helper function for using `connectOrCreate` in a prisma create query */
export const connectOrCreate = <T extends Record<string, any> | undefined>(resources: Array<T>, uniqueKey: keyof NonNullable<T>) => {
	if (resources.length <= 0) return undefined
	return {
		connectOrCreate: filterUnspecified(resources).map((resource) => ({
			where: {
				[uniqueKey]: resource[uniqueKey],
			},
			create: {
				...resource,
			},
		})),
	}
}

export const connectMap = <T extends Record<string, any> | undefined>(resources: Array<T>, uniqueKey: keyof NonNullable<T>) => {
	if (resources.length <= 0) return undefined
	return {
		connect: filterUnspecified(resources).map((resource) => ({
			[uniqueKey]: resource[uniqueKey],
		})),
	}
}
