import { Snackbar } from './Snackbar'

type Props = {
	snackbars: Array<{
		text: string,
		error?: boolean,
	}>,
}

const testBars = [
	{ text: 'This is a text', error: true },
]

export const Snackbars = ({ snackbars = testBars }: Props) => (
	<>
		{snackbars.map(({ text, error }) => <Snackbar error={error}>{text}</Snackbar>)}
	</>
)
