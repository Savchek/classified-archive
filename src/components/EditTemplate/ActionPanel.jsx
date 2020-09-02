import React from 'react'
import { getLayoutItem, deleteLayoutItem, imageFitTypes, changeImageFitType } from './../data'


const ActionPanel = ({ layoutItemID, setActive, styleSheet }) => {

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

	const imageFitTypeSwitch = (layoutItem) => (
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
			{
				layoutItemID === -1 ?
					<p>No layout item chosen</p> :
					generateMenu()
			}
		</div>
	)
}

export default ActionPanel
