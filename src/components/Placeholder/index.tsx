import { Internal } from './Internal'

type Props = {
	children: React.ReactNode,
	isLoading: boolean,
	lines?: number,
	width?: number | string,
}

export const Placeholder = ({ children, isLoading, lines = 1, width = '80%' }: Props) => {
	if (isLoading) {
		return <Internal lines={lines} width={width} />
	} else {
		return <>{children}</>
	}
}
