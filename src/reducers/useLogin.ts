import useFirebase from 'lib/useFirebase'

export const ACTIONS = {
	LOGIN: 'LOGIN',
}

const useLogin = () => {
	const [firebase] = useFirebase()

	const signUp = ({ email, password }: { email: string, password: string }) => {
		firebase.auth().createUserWithEmailAndPassword(email, password).catch((error: Error) => {
			console.error(error)
		})
	}

	const login = ({ email, password }: { email: string, password: string }) => {
		firebase.auth().signInWithEmailAndPassword(email, password)
	}

	const logout = () => {
		firebase.auth().signOut()
	}

	return { signUp, login, logout }
}

export default useLogin
