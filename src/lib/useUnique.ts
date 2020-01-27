import { useState } from 'react'
import { uniqueId } from 'lodash-es'

const useUnique = (name?: string) => {
	const [id] = useState(() => uniqueId(`${name || 'unique'}-`))

	return id
}

export default useUnique
