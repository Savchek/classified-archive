import React, { useState } from 'react'
import { inject, observer } from 'mobx-react'
import { getTemplate, setScreen } from './../data'
import DynamicDragBox from './DynamicDragBox'
import ActionPanel from './ActionPanel'
import AddingPanel from './AddingPanel'


const EditTemplate = () => {

	const [active, setActive] = useState(-1)


	const setActiveHandle = (e, activeId) => {
		if (active === activeId) return
		e.stopPropagation()
		setActive(activeId)
	}

	const gotoList = () => setScreen('list')

	const loopLayout = () => {
		return Object.keys(getTemplate().layout).map(key => {
			return (
				<DynamicDragBox
					key={key}
					layoutId={key}
					active={active}
					setActiveHandle={setActiveHandle}
				/>
			)
		})
	}


	return (
		<div style={{
			display: 'flex',
			flexDirection: 'column',
			height: '100vh',
			width: '100vw'
		}}>


			<div style={{
				display: 'flex',
				height: '85vh',
				width: '100vw'
			}}>

				<div
					className='dragBoxBoundry'
					style={{
						border: '1px solid cyan',
						width: '85vw',
						height: 'inherit',
						backgroundColor: 'rgba(100, 150, 255, 0.2)'
					}}>

					<button onClick={gotoList}>Go to List</button>
					{loopLayout()}

				</div>

				<AddingPanel
					setActive={setActive}
					styleSheet={{
						width: '15vw',
						height: 'inherit',
						backgroundColor: 'rgba(100, 255, 100, 0.2)',
						border: '1px solid green',
						position: 'fixed',
						right: '0',
						top: '0',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}} />

			</div>


			<ActionPanel
				layoutItemID={active}
				setActive={setActive}
				styleSheet={{
					height: '15vh',
					width: '100vw',
					backgroundColor: 'rgba(255, 100, 100, 0.2)',
					border: '1px solid red',
					position: 'fixed',
					bottom: '0',
				}}
			/>

		</div>
	)
}

export default inject('templates')(observer(EditTemplate))
