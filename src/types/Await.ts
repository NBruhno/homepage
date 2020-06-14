/**
 * Unwraps promises and/or unwraps thenable objects
 * @example
 * ```tsx
 * const resultOfPromise: Await<ReturnType<typeof yourPromise>> = await yourPromise
 * ```
 */
export type Await<Type> = Type extends {
	then(onfulfilled?: (value: infer Unknown) => unknown): unknown,
} ? Unknown : Type
