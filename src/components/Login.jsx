import React, { useState } from 'react'
import firebase from './firebase'
import { setScreen } from './data'

const Login = () => {

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)

	const signIn = async () => {
		let error = await firebase.signInWithEmailAndPassword(email, password, setLoading)
		if (error) {
			alert(error.message)
		} else {
			setScreen('list')
		}
	}

	const register = async () => {
		let error = await firebase.createUserWithEmailAndPassword(email, password, setLoading)
		if (error) {
			alert(error.message)
		} else {
			setScreen('list')
		}
	}

	const submitDenial = (e) => e.preventDefault() && false
	const emailInputChange = (e) => setEmail(e.target.value)
	const passwordInputChange = (e) => setPassword(e.target.value)



	return (
		<div>
			<h1>Login or register</h1>
			<form onSubmit={submitDenial}>
				<label>Email Address</label>
				<input id="email" name="email" value={email} onChange={emailInputChange} />
				<label>Password</label>
				<input name="password" type="password" id="password" value={password} onChange={passwordInputChange} />

				<button onClick={signIn}>Sign in</button>
				<button onClick={register}>Register</button>
			</form>
			{
				loading && <div className="loader">Loading</div>
			}
		</div>
	)
}

export default Login