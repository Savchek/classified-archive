import React, { useState } from 'react'
import { inject, observer } from 'mobx-react'
import { getTemplate, setScreen, displayAddingPanel, displayActionPanel } from './../data'
import DynamicDragBox from './DynamicDragBox'
import ActionPanel from './ActionPanel'
import AddingPanel from './AddingPanel'


const EditTemplate = ({ settings }) => {

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
			position: 'relative',
			height: '100vh',
			width: '100vw'
		}}>


			<div
				style={{
					border: '1px solid cyan',
					backgroundColor: 'rgba(100, 150, 255, 0.2)',
					height: '100vh',
					width: '100%',
					marginRight: '15vw',
				}}>

				<button onClick={gotoList}>Go to List</button>
				{loopLayout()}

			</div>

			{settings.layout.showAddingPanel ?
				<AddingPanel
					setActive={setActive}
					styleSheet={{
						width: settings.layout.addingPanelWidth + 'px',
						height: settings.layout.addingPanelHeight + 'px',
						backgroundColor: 'rgba(100, 255, 100, 0.2)',
						border: '1px solid green',
						position: 'fixed',
						right: '0',
						top: '0',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				/> :
				<button
					style={{
						display: 'block',
						position: 'fixed',
						top: '20px',
						right: '20px'
					}}
					onClick={displayAddingPanel}
				>
					Show adding panel
				</button>
			}

			{settings.layout.showActionPanel ?
				<ActionPanel
					layoutItemID={active}
					setActive={setActive}
					styleSheet={{
						width: '100%',
						height: settings.layout.actionPanelHeight + 'px',
						backgroundColor: 'rgba(255, 100, 100, 0.2)',
						border: '1px solid red',
						position: 'fixed',
						bottom: '0',
					}}
				/> :
				<button
					style={{
						display: 'block',
						position: 'fixed',
						bottom: '20px',
						left: '20px'
					}}
					onClick={displayActionPanel}
				>
					Show action panel
				</button>
			}

		</div>
	)
}

export default inject('templates', 'settings')(observer(EditTemplate))
