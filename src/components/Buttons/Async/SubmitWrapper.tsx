import { cloneElement } from 'react'
import { useFormState } from 'react-final-form'

type Props = {
	children: React.ReactNode,
}

export const SubmitWrapper = ({ children }: Props) => {
	const { submitting } = useFormState({ subscription: { submitting: true } })

	return (
		<div>
			{cloneElement(children as React.ReactElement<any>, { isLoading: submitting })}
		</div>
	)
}
