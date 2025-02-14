import type { ReactElement } from 'react'
import { useFormState } from 'react-hook-form'

type Props = {
	render: (args: { isSubmitting: boolean }) => ReactElement
}

export const SubmitWrapper = ({ render }: Props) => {
	const { isSubmitting } = useFormState()
	return render({ isSubmitting })
}
