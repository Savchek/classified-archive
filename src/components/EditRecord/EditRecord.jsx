import React from 'react'
import { inject, observer } from 'mobx-react'
import { getTemplate, setScreen, getRecord } from '../data'
import DynamicDragBox from './DynamicDragBox'


const EditRecord = () => {

	const gotoShowRecord = () => setScreen('showRecord')
	const gotoList = () => setScreen('list')

	const getContent = (key) => {
		let content
		let fill = getRecord().fill[key]
		if (fill) {
			content = fill.content
		}
		return content
	}

	const loopLayout = () => Object.keys(getTemplate().layout).map(key => {
		let content = getContent(key)
		return (
			<DynamicDragBox
				key={key}
				fillItemId={key}
				content={content}
			/>
		)
	})


	return (
		<div>

			<button onClick={gotoShowRecord}>Back</button>
			<button onClick={gotoList}>Go to List</button>

			{loopLayout()}

		</div>
	)
}

export default inject('records')(observer(EditRecord))
