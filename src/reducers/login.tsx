import { useFirebase } from 'lib/useFirebase'

export const useLogin = () => {
	const { firebase } = useFirebase()

	const signUp = ({ email, password, displayName }: { email: string, password: string, displayName: string }) => {
		firebase.auth().createUserWithEmailAndPassword(email, password).then(async ({ user }) => {
			await firebase.auth().currentUser.getIdToken(false).then(async (token: string) => {
				try {
					await fetch(`/api/users`, {
						method: 'POST',
						body: JSON.stringify({
							displayName,
							email: user.email,
							uid: user.uid,
						}),
						headers: new Headers({
							'Content-Type': 'application/json',
							Authorization: `Bearer ${token}`,
						}),
					})
				} catch (error) {
					console.error(error)
				}
			})
		}).catch((error: Error) => {
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
