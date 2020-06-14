import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useAuthWrapper } from 'lib/useAuthWrapper'
import { useFirebase } from 'lib/useFirebase'

export const useTestList = () => {
	const { firebase } = useFirebase()
	const [data, loading, error] = useCollectionData(firebase?.firestore()?.collection(`tests`))

	return { testList: data, testListLoading: loading, testListError: error }
}

export const useTestListActions = () => {
	const { firebase } = useFirebase()
	const authWrapper = useAuthWrapper(firebase)

	const createTest = async (body: Record<string, any>) => {
		await authWrapper({ url: `/api/tests`, method: 'POST', body })
	}

	return { createTest }
}
