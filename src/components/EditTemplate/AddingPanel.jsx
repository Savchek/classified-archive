import React, { useState, useEffect } from 'react'
import { Rnd } from 'react-rnd'
import { addLayoutItem, changeAddingPanelWidth, hideAddingPanel } from './../data'


const AddingPanel = ({ styleSheet, setActive }) => {

	let boxHeight = 50

	const [boxData, setBoxData] = useState({})
	const [canResize, setCanResize] = useState(false)

	const allowResize = () => {
		setCanResize(true)
	}


	useEffect(() => {
		let boxNames = ['label', 'textbox', 'image']
		let boxVerticalGap = 10
		let obj = {}
		boxNames.forEach((e, i) => obj[e] = {
			x: '',
			y: i * boxHeight + boxVerticalGap * (i + 1)
		})
		setBoxData(obj)


		const cancelResize = () => {
			setCanResize(false)
		}

		const resize = (e) => {
			canResize && changeAddingPanelWidth(e)
		}

		window.addEventListener('mouseup', cancelResize)
		window.addEventListener('mousemove', resize)

		return () => {
			window.removeEventListener('mouseup', cancelResize)
			window.removeEventListener('mousemove', resize)
		}

	}, [boxHeight, canResize])

	return (
		<div style={styleSheet}>
			<button style={{ position: 'absolute', left: '-70px', top: '20px' }} onClick={hideAddingPanel}>Hide</button>
			<div
				style={{
					position: 'absolute',
					left: '-5px',
					top: '0',
					width: '10px',
					height: '100%',
					backgroundColor: 'rgba(100, 255, 100, 0.8)',
					cursor: 'col-resize',
				}}
				onMouseDown={allowResize}
			/>

			{
				Object.keys(boxData).map(k => {
					return (
						<Rnd
							key={k}
							position={boxData[k]}
							size={{ width: '100%', height: boxHeight }}
							enableResizing={false}

							onDragStop={
								(e, pos) => {

									if (pos.x >= 0) {
										return
									}
									let x = e.target.parentNode.parentNode.clientWidth + pos.x - e.target.parentNode.clientWidth
									let position = { x, y: pos.y }
									let createdItemId = addLayoutItem(k, position)
									setActive(createdItemId)
								}
							}

							style={
								{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									border: '1px solid blue'
								}
							}
						>

							{k}

						</Rnd >
					)
				})
			}


		</div >
	)
}

export default AddingPanel
