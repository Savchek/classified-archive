import React from 'react'
import './App.css'
import { Provider } from 'mobx-react'
import { templates, records, screen } from './data'
import Router from './Router'

const App = () => {
	return (
		<Provider {...{ templates, records, screen }}>
			<Router />
		</Provider>
	)
}

export default App
