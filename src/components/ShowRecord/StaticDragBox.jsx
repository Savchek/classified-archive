import React from 'react'
import { Rnd } from 'react-rnd'
import { getTemplate } from './../data'

const StaticDragBox = ({ layoutId, content }) => {

	let layoutElement = getTemplate().layout[layoutId]

	const elementSwitcher = () => {
		/*  eslint-disable*/
		switch (layoutElement.type) {
			case 'textbox':
				return <p>{content}</p>
			case 'templateName':
				return <p>{layoutElement.name}</p>
			case 'label':
				return <p>{layoutElement.name}:</p>
			case 'image':
				return <div
					style={{
						width: '100%',
						height: '100%',
						backgroundImage: `url(${content})`,
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

			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}

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

		>

			{elementSwitcher()}

		</Rnd >
	)
}

export default StaticDragBox