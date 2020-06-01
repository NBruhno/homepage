import { useState } from 'react'
import { uniqueId } from 'lodash-es'

export const useUnique = (name?: string) => {
	const [id] = useState(() => uniqueId(`${name || 'unique'}-`))

	return id
}
