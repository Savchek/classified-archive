import React from 'react'
import { Rnd } from 'react-rnd'
import { inject, observer } from 'mobx-react'
import { getTemplate, editRecordField } from './../data'

const DynamicDragBox = ({ fillItemId, content }) => {

	let layoutElement = getTemplate().layout[fillItemId]

	const elementSwitcher = () => {
		/*  eslint-disable*/
		switch (layoutElement.type) {
			case 'textbox':
				return <textarea
					style={{
						margin: '0',
						padding: '0',
						width: '100%',
						height: '100%',
						border: 'none',
						outline: 'none',
						color: 'black',
						backgroundColor: 'rgba(0, 0, 0, 0.1)',
						resize: 'none',
						textAlignLast: 'center',
					}}
					value={content}
					onChange={(e) => editRecordField(fillItemId, e.target.value)}
					onDoubleClick={e => e.target.select()}

				/>
			case 'templateName':
			case 'label':
				return <textarea
					style={{
						margin: '0',
						padding: '0',
						width: layoutElement.size.width,
						height: layoutElement.size.height,
						textAlignLast: 'center',
						border: 'none',
						outline: 'none',
						color: 'grey',
						backgroundColor: 'rgba(0, 0, 0, 0.1)',
						resize: 'none',
						pointerEvents: 'none',
					}}
					value={layoutElement.name}
					readOnly={true}
				/>
			case 'image':
				return <div
					style={{
						display: 'flex',
						margin: '0',
						padding: '0',
						width: layoutElement.size.width,
						height: layoutElement.size.height,
						alignItems: 'center',
						backgroundImage: `url(${content})`,
						backgroundPosition: 'center',
						backgroundSize: layoutElement.fit,
						backgroundRepeat: 'no-repeat',
						border: '1px solid black',
					}}
				>
					<input
						style={{
							width: layoutElement.size.width,
							border: 'none',
							outline: 'none',
							background: 'rgba(230, 230, 230, 0.9)',
							border: '1px solid black',

						}}
						value={content}
						onChange={(e) => editRecordField(fillItemId, e.target.value)}
						onDoubleClick={e => e.target.select()}
					/>
				</div>
		}
		/* eslint-enable */
	}

	return (
		<Rnd

			size={layoutElement.size}
			position={layoutElement.pos}

			disableDragging={true}

			enableResizing={{
				bottom: false,
				bottomLeft: false,
				bottomRight: false,
				left: false,
				right: false,
				top: false,
				topLeft: false,
				topRight: false,
			}}

			style={
				{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}
			}

		>
			<div style={{
				pointerEvents: 'none',
				position: 'absolute',
				display: 'inline',
				width: '100%',
				height: '100%',
				top: '0',
				left: '0',
				bottom: '0',
				right: '0'
			}} />

			{elementSwitcher()}
		</Rnd >
	)
}

export default inject('records')(observer(DynamicDragBox))