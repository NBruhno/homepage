import { useFormState } from 'react-hook-form'

type Props = {
	render: (args: { isSubmitting: boolean }) => JSX.Element,
}

export const SubmitWrapper = ({ render }: Props) => {
	const { isSubmitting } = useFormState()
	return render({ isSubmitting })
}
