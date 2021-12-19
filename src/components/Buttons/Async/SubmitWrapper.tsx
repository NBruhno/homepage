import type { ReactNode, ReactElement } from 'react'

import { cloneElement } from 'react'
import { useFormState } from 'react-final-form'

type Props = {
	children: ReactNode,
}

export const SubmitWrapper = ({ children }: Props) => {
	const { submitting: isSubmitting } = useFormState({ subscription: { submitting: true } })

	return (
		<div>
			{cloneElement(children as ReactElement<any>, { isLoading: isSubmitting })}
		</div>
	)
}
