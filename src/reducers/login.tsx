import { useFirebase } from 'lib/useFirebase'

export const useLogin = () => {
	const { firebase } = useFirebase()

	const signUp = async ({ email, password, displayName }: { email: string, password: string, displayName: string }) => {
		await firebase.auth().createUserWithEmailAndPassword(email, password).then(async ({ user }) => {
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

	const login = async ({ email, password }: { email: string, password: string }) => {
		await firebase.auth().signInWithEmailAndPassword(email, password)
	}

	const logout = async () => {
		await firebase.auth().signOut()
	}

	return { signUp, login, logout }
}
