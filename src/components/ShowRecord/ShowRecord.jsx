import React from 'react'
import { inject, observer } from 'mobx-react'
import { getTemplate, getRecord, setScreen } from './../data'
import StaticDragBox from './StaticDragBox'


const ShowRecord = () => {


	const getContent = (key) => {
		let content = false
		let fill = getRecord().fill[key]
		if (fill) {
			content = fill.content
		}
		return content
	}

	const gotoEditRecord = () => {
		setScreen('editRecord')
	}

	const gotoList = () => {
		setScreen('list')
	}

	const loopLayout = () => {
		return Object.keys(getTemplate().layout).map(key => {
			let content = getContent(key)
			return (
				<StaticDragBox
					key={key}
					layoutId={key}
					content={content}
				/>
			)
		})
	}




	return (
		<div>

			<button onClick={gotoList}>Back</button>
			<button onClick={gotoEditRecord}>Edit record</button>

			{loopLayout()}


		</div>
	)
}

export default inject('templates')(observer(ShowRecord))
