import { useId } from 'react'

/**
 * Hook that provides an unique identifier. Primarily used to provide a unique ID to form fields.
 * This hook uses react `useId` so it should sync the IDs for both client and server side rendering.
 * @param name - Used to replace the "unique" prefix with a more meaningful name
 * @example
 * ```tsx
 * const [id] = useUnique()
 * ```
*/
export const useUnique = (name?: string) => {
	const generatedId = useId()
	return name ? `${name}-${generatedId}` : generatedId
}
