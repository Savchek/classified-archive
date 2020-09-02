import React, { useState, useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import firebase from './firebase'
import { setScreen } from './data'


import List from './List'
import ShowRecord from './ShowRecord/ShowRecord'
import EditTemplate from './EditTemplate/EditTemplate'
import EditRecord from './EditRecord/EditRecord'
import Login from './Login'

const Router = ({ screen }) => {


	const initFirebase = async () => {

		firebase.auth.onAuthStateChanged(user => {
			if (user) {
				firebase.updateCollection()
				setScreen('list')
			} else {
				setScreen('login')
			}
		})

	}


	useEffect(() => {
		initFirebase()
	}, [])

	const screenSwitch = () => {
		/* eslint-disable */
		switch (screen.get()) {
			case 'loading':
				return <div className="loader">Loading</div>
			case 'login':
				return <Login />
			case 'list':
				return <List />
			case 'showRecord':
				return <ShowRecord />
			case 'editTemplate':
				return <EditTemplate />
			case 'editRecord':
				return <EditRecord />
			default:
				alert('Router error')
				return <List />
		}
		/* eslint-enable */
	}

	return (
		<div>
			{
				screenSwitch()
			}
		</div>
	)
}

export default inject('screen')(observer(Router))
