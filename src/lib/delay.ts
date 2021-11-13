/* eslint-disable no-promise-executor-return */
/**
 * Helper function that can provide a delay, primarily used for showcase in stories.
 * @param seconds - number that determines the length of the delay
 * @example
 * ```tsx
 * const yourFunction = async () => {
 * 	await delay(2)
 * }
 * ```
 */
export const delay = (seconds: number) => new Promise((resolve) => setTimeout(resolve, seconds * 1000))
