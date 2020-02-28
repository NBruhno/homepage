import useFirebase from 'lib/useFirebase'

export const ACTIONS = {
	LOGIN: 'LOGIN',
}

const useLogin = () => {
	const [firebase] = useFirebase()

	const signUp = ({ email, password }) => {
		firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
			console.error(error)
		})
	}

	const login = ({ email, password }) => {
		firebase.auth().signInWithEmailAndPassword(email, password)
	}

	const logout = () => {
		firebase.auth().signOut()
	}

	return { signUp, login, logout }
}

export default useLogin
