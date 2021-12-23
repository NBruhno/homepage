import { Snackbar } from './Snackbar'

type Props = {
	snackbars: Array<{
		text: string,
		isError?: boolean,
	}>,
}

const testBars = [
	{ text: 'This is a text', isError: true },
]

export const Snackbars = ({ snackbars = testBars }: Props) => (
	<>
		{snackbars.map(({ text, isError }, index) => <Snackbar isError={Boolean(isError)} key={index}>{text}</Snackbar>)}
	</>
)
