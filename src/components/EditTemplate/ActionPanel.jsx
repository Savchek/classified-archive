import React, { useState, useEffect } from 'react'
import { getLayoutItem, deleteLayoutItem, imageFitTypes, changeImageFitType, changeActionPanelHeight, hideActionPanel } from './../data'


const ActionPanel = ({ layoutItemID, setActive, styleSheet }) => {

	const [canResize, setCanResize] = useState(false)

	const allowResize = () => {
		setCanResize(true)
	}

	useEffect(() => {
		const cancelResize = () => {
			setCanResize(false)
		}
		const resize = (e) => {
			canResize && changeActionPanelHeight(e)
		}
		window.addEventListener('mouseup', cancelResize)
		window.addEventListener('mousemove', resize)
		return () => {
			window.removeEventListener('mouseup', cancelResize)
			window.removeEventListener('mousemove', resize)
		}
	}, [canResize])

	const deleteItem = () => {
		let conf = true

		if (getLayoutItem(layoutItemID).type === 'textbox') {
			conf = window.confirm('This will delete all connected record fields')
		}

		if (!conf) return

		deleteLayoutItem(layoutItemID)
		setActive(-1)
	}

	const pickImageFitType = (e) => {
		changeImageFitType(layoutItemID, e.target.value)
	}

	const imageFitTypeSwitch = (layoutItem) => {
		return (
			<select onChange={pickImageFitType} value={layoutItem.fit}>
				{
					imageFitTypes.map(e =>
						(
							<option key={e} value={e} >
								{e}
							</option>
						)
					)
				}
			</select>
		)
	}


	const generateMenu = () => {

		let layoutItem = getLayoutItem(layoutItemID)

		return (
			<div>
				<p>{layoutItem.type}</p>
				{
					layoutItem.type !== 'templateName' && <button onClick={deleteItem}>Delete this shit</button>
				}
				{
					layoutItem.type === 'image' && imageFitTypeSwitch(layoutItem)
				}
			</div>
		)
	}

	return (
		<div style={styleSheet}>
			<button style={{ position: 'absolute', left: '20px', top: '-50px' }} onClick={hideActionPanel}>Hide</button>
			<div
				style={{
					position: 'absolute',
					top: '-5px',
					left: '0',
					height: '10px',
					width: '100%',
					backgroundColor: 'rgba(255, 100, 100, 0.8)',
					cursor: 'row-resize',
				}}
				onMouseDown={allowResize}
			/>
			{
				layoutItemID === -1 ?
					<p>No layout item chosen</p> :
					generateMenu()
			}
		</div>
	)
}

export default ActionPanel
