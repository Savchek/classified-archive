import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { setScreen } from './data'

/* eslint-disable */
const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_DATABASE_URL,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID
}
/* eslint-enable */

class Firebase {

	constructor() {
		app.initializeApp(firebaseConfig)
		this.auth = app.auth()
		this.db = app.firestore()
	}

	async updateUserProfileName(displayName) {
		// Also can delete user, update password, email, etc.
		// https://firebase.google.com/docs/auth/web/manage-users
		const user = this.auth.currentUser
		try {
			user.updateProfile({ displayName })
		}
		catch (error) {
			alert('Can\'t update user profile name')
			console.log(error)
		}
	}

	async signInWithEmailAndPassword(email, password, setLoading) {
		try {
			setLoading(true)
			await this.auth.signInWithEmailAndPassword(email, password)
		}
		catch (error) {
			setLoading(false)
			console.log(error)
			return error
		}
		return false
	}

	async signInWithPopup() {
		let provider = new this.auth.GoogleAuthProvider()
		let result
		try {
			result = await this.auth().signInWithPopup(provider)
			// This gives you a Google Access Token. You can use it to access the Google API.
			var token = result.credential.accessToken
			// The signed-in user info.
			var user = result.user
			// ...
		}
		catch (error) {
			alert('Can\'t sign in with popup')
			console.log(error)
		}

	}

	async signOut() {
		try {
			await this.auth.signOut()
		}
		catch (error) {
			alert('Sign out error')
			console.log(error)
		}
	}

	async createUserWithEmailAndPassword(email, password, setLoading) {
		try {
			setLoading(true)
			await this.auth.createUserWithEmailAndPassword(email, password)
			await this.db.collection('users').doc(this.auth.currentUser.uid).set({
				products: [],
				sells: [],
				pastSells: []
			})
		}
		catch (error) {
			setLoading(false)
			return error
		}
		return false
	}

	async updateCollection() {
		try {
			const collection = await this.db.collection('users').doc(this.auth.currentUser.uid).get()
			this.collection = collection.data()
		}
		catch (error) {
			alert('Can\'t get data from database')
			console.log(error)
		}
	}

	async addData(data) {
		try {
			await this.db.collection('users').doc(this.auth.currentUser.uid).update({
				products: app.firestore.FieldValue.arrayUnion(data)
			})
		}
		catch (error) {
			alert('Can\'t add data')
			console.log(error)
		}
		await this.updateCollection()
	}

	async deleteData(data) {
		try {
			await this.db.collection('users').doc(this.auth.currentUser.uid).update({
				products: app.firestore.FieldValue.arrayRemove(data)
			})
		}
		catch (error) {
			alert('Can\'t delete data')
			console.log(error)
		}
		await this.updateCollection()
	}
}

export default new Firebase()