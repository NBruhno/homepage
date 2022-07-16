import type { ReactNode, ReactElement } from 'react'

import { cloneElement } from 'react'
import { useFormState } from 'react-hook-form'

type Props = {
	children: ReactNode,
}

export const SubmitWrapper = ({ children }: Props) => {
	const { isSubmitting } = useFormState()

	return (
		<div>
			{cloneElement(children as ReactElement<any>, { isLoading: isSubmitting })}
		</div>
	)
}
