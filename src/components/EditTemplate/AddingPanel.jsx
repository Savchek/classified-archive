import React, { useState, useEffect } from 'react'
import { Rnd } from 'react-rnd'
import { addLayoutItem } from './../data'


const AddingPanel = ({ styleSheet, setActive }) => {

	let boxHeight = 50
	let boxVerticalGap = 10
	let boxNames = ['label', 'textbox', 'image']

	const [boxData, setBoxData] = useState({})

	useEffect(() => {
		let obj = {}
		boxNames.forEach((e, i) => obj[e] = {
			x: '',
			y: i * boxHeight + boxVerticalGap * (i + 1)
		})
		setBoxData(obj)
	}, [])

	return (
		<div style={styleSheet}>

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
