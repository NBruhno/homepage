/** Removes null or undefined from the list and its type.
 * Normal .filter prototype does not update the type to not include null or undefined */
export const filterUnspecified = <T>(list: Array<T>) => list.filter((item): item is NonNullable<T> => !!item)
