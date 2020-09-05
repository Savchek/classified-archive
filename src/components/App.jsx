import React from 'react'
import './App.css'
import { Provider } from 'mobx-react'
import { templates, records, screen, settings } from './data'
import Router from './Router'

const App = () => {
	return (
		<Provider {...{ templates, records, screen, settings }}>
			<Router />
		</Provider>
	)
}

export default App
