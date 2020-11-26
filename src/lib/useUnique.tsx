import { uniqueId } from 'lodash'
import { useState } from 'react'

/**
 * Hook that provides an unique identifier. Primarily used to provide a unique ID to form fields.
 * @param name - Used to replace the "unique" prefix with a more meaningful name
 * @example
 * ```tsx
 * const [id] = useUnique()
 * ```
*/
export const useUnique = (name?: string) => {
	const [id] = useState(() => uniqueId(`${name || 'unique'}-`))

	return id
}
