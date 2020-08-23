import { useGlobalState } from './globalState'

export const useResponsive = () => {
	const [responsive, setResponsive] = useGlobalState('responsive')
	const updateResponsive = (payload: Partial<typeof responsive>) => {
		setResponsive({ ...responsive, ...payload })
	}

	return {
		...responsive,
		updateResponsive,
	}
}
