import React from 'react'
import { Rnd } from 'react-rnd'
import { inject, observer } from 'mobx-react'
import { updPos, updSize, getTemplate, editTemplateElementName } from './../data'

const DynamicDragBox = ({ layoutId, active, setActiveHandle }) => {

	let layoutElement = getTemplate().layout[layoutId]

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
						color: 'grey',
						resize: 'none',
						textAlignLast: 'center',
						backgroundColor: 'transparent',
					}}
					readOnly={true}
					value='Textbox'
				/>
			case 'label':
			case 'templateName':
				return <textarea
					style={{
						margin: '0',
						padding: '0',
						width: layoutElement.size.width,
						height: layoutElement.size.height,
						textAlignLast: 'center',
						border: 'none',
						outline: 'none',
						color: 'black',
						resize: 'none',
						backgroundColor: 'transparent',
					}}
					value={layoutElement.name}
					onChange={(e) => editTemplateElementName(layoutId, e.target.value)}
					onDoubleClick={e => e.target.select()}
				/>
			case 'image':
				return <div
					style={{
						width: '100%',
						height: '100%',
						backgroundImage: 'url(https://static.toiimg.com/thumb/72975551.cms?width=680&height=512&imgsize=881753)',
						backgroundPosition: 'center',
						backgroundSize: layoutElement.fit,
						backgroundRepeat: 'no-repeat',
						border: '1px solid black'
					}}
				/>
		}
		/* eslint-enable */
	}

	return (
		<Rnd

			size={layoutElement.size}
			position={layoutElement.pos}

			onDragStop={
				(e, pos) => active !== -1 && updPos(layoutElement.id, pos)
			}
			onResizeStop={
				(e, _direction, ref, delta, pos) => active !== -1 && updSize(layoutElement.id, pos, ref)
			}
			onMouseDown={
				e => setActiveHandle(e, layoutElement.id)
			}
			onResize={
				e => setActiveHandle(e, layoutElement.id)
			}

			style={
				{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}
			}

			onDrag={
				(node, x, y, deltaX, deltaY) => {
					console.log(node, x, y, deltaX, deltaY,)
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
				right: '0',
				border: (active === layoutElement.id ? '1px solid rgb(193, 66, 66)' : '1px solid rgb(122, 122, 122)'),
				backgroundColor: (active === layoutElement.id ? 'rgba(193, 66, 66, 0.26)' : 'rgba(122, 122, 122, 0.26)')
			}} />

			{elementSwitcher()}
		</Rnd >
	)
}

export default inject('templates')(observer(DynamicDragBox))