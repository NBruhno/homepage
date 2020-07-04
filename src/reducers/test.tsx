export const useless = () => 1

// import { useDocument } from 'react-firebase-hooks/firestore'

// import { useAuthWrapper } from 'lib/useAuthWrapper'
// import { useFirebase } from 'lib/useFirebase'

// export const useTest = (testId: string | string[]) => {
// 	const { firebase } = useFirebase()
// 	const authWrapper = useAuthWrapper(firebase)
// 	const [snapshot, loading, error] = useDocument(firebase?.firestore()?.doc(`tests/${testId}`))

// 	const updateTest = async (testId: string, body: Record<string, any>) => {
// 		await authWrapper({ url: `/api/tests/${testId}`, method: 'PUT', body })
// 	}

// 	const deleteTest = async (testId: string) => {
// 		await authWrapper({ url: `/api/tests/${testId}`, method: 'DELETE' })
// 	}

// 	return { testData: snapshot?.data(), testLoading: loading, testError: error, updateTest, deleteTest }
// }

// export const useTestActions = () => {
// 	const { firebase } = useFirebase()
// 	const authWrapper = useAuthWrapper(firebase)

// 	const updateTest = async (testId: string, body: Record<string, any>) => {
// 		await authWrapper({ url: `/api/tests/${testId}`, method: 'PUT', body })
// 	}

// 	const deleteTest = async (testId: string) => {
// 		await authWrapper({ url: `/api/tests/${testId}`, method: 'DELETE' })
// 	}

// 	return { updateTest, deleteTest }
// }
