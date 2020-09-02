import { observable, action, toJS } from 'mobx'

const generateID = () => Math.random().toString(36).substr(2, 9)

export const imageFitTypes = ['cover', 'contain', 'auto']

export const screen = observable.box('loading')
export const setScreen = (location) => screen.set(location)

export const templates = observable(
	{
		'1337': {
			id: '1337',
			name: 'Car',
			layout: {
				'13370': {
					id: '13370',
					type: 'templateName',
					name: 'Car',
					size: {
						width: '35px',
						height: '25px'
					},
					pos: {
						x: 300,
						y: 50
					},
					zIndex: 1
				},
				'13371': {
					id: '13371',
					type: 'label',
					name: 'Mark',
					size: {
						width: '40px',
						height: '25px'
					},
					pos: {
						x: 50,
						y: 200
					},
					zIndex: 1
				},
				'13376': {
					id: '13376',
					type: 'label',
					name: 'Model',
					size: {
						width: '50px',
						height: '25px'
					},
					pos: {
						x: 50,
						y: 300
					},
					zIndex: 1
				},
				'13372': {
					id: '13372',
					type: 'textbox',
					size: {
						width: '80px',
						height: '25px'
					},
					pos: {
						x: 100,
						y: 200
					},
					zIndex: 2
				},
				'13373': {
					id: '13373',
					type: 'textbox',
					size: {
						width: '80px',
						height: '25px'
					},
					pos: {
						x: 100,
						y: 300
					},
					zIndex: 2
				},
				'13374': {
					id: '13374',
					type: 'image',
					fit: 'cover',
					size: {
						width: '300px',
						height: '150px'
					},
					pos: {
						x: 50,
						y: 400
					},
					zIndex: 2
				}
			}
		},
		setSize(layoutID, size) {
			if (chosenTemplate !== -1) {
				this[chosenTemplate].layout[layoutID].size = size
			}
		},
		setPos(layoutID, pos) {
			if (chosenTemplate !== -1) {
				this[chosenTemplate].layout[layoutID].pos = pos
			}
		},
		editTemplateElementName(layoutID, value) {
			this[chosenTemplate].layout[layoutID].name = value
			if (this[chosenTemplate].layout[layoutID].type === 'templateName') {
				this[chosenTemplate].name = value
			}
		},
		setImageFitType(layoutID, fitType) {
			this[chosenTemplate].layout[layoutID].fit = fitType
		}
	},
	{
		setSize: action,
		setPos: action,
		editTemplateElementName: action,
		setImageFitType: action,
	}
)

export const records = observable(
	{
		'1337': {
			// this record id
			'111': {
				id: '111',
				// ID of this element parent
				parentID: '1337',
				name: 'Ford',
				nameChained: '13372',
				fill: {
					'13372': {
						// ID of layout element this content belong to
						id: '13372',
						content: 'Ford'
					},
					'13373': {
						// ID of layout element this content belong to
						id: '13373',
						content: 'Mustang'
					},
					'13374': {
						// ID of layout element this content belong to
						id: '13374',
						content: 'https://autoua.net/media/uploads/ford/electric-ford-mustang-by-charge-cars.jpg'
					}
				}
			},
			'222': {
				id: '222',
				parentID: '1337',
				name: 'Toyota',
				nameChained: '13372',
				fill: {
					'13372': {
						id: '13372',
						content: 'Toyota'
					},
					'13373': {
						// ID of layout element this content belong to
						id: '13373',
						content: 'Corolla'
					},
					'13374': {
						// ID of layout element this content belong to
						id: '13374',
						content: 'https://carrentalgeorgia.ge/uploads/product/834471572870733.jpg'
					}
				}
			}
		},
		editRecordField(fillItemId, value) {
			this[chosenTemplate.get()][chosenRecord.get()].fill[fillItemId].content = value

			if (this[chosenTemplate.get()][chosenRecord.get()].nameChained === fillItemId) {
				this[chosenTemplate.get()][chosenRecord.get()].name = value
			}
		}
	},
	{
		editRecordField: action,
	}
)

export const chosenTemplate = observable.box(-1)
export const chosenRecord = observable.box(-1)

export const getTemplate = () => {
	return toJS(templates[chosenTemplate.get()])
}

export const getRecord = () => {
	return toJS(records[chosenTemplate.get()][chosenRecord.get()])
}

export const chooseTemplate = (templateID) => {
	chosenTemplate.set(templateID)
}

export const chooseRecord = (recordID) => {
	chosenRecord.set(recordID)
}

export const createNewTemplate = () => {
	let id = generateID()
	templates[id] = {
		id,
		name: 'New template',
		layout: {
			'1': {
				id: '1',
				type: 'templateName',
				name: 'New template',
				size: {
					width: '100px',
					height: '25px'
				},
				pos: {
					x: 200,
					y: 50
				},
				zIndex: 1
			},
			'2': {
				id: '2',
				type: 'label',
				name: 'default label',
				size: {
					width: '90px',
					height: '25px'
				},
				pos: {
					x: 50,
					y: 100
				},
				zIndex: 1
			},
			'3': {
				id: '3',
				type: 'textbox',
				size: {
					width: '100px',
					height: '25px'
				},
				pos: {
					x: 150,
					y: 100
				},
				zIndex: 1
			},
		}
	}
	chooseTemplate(id)
	createNewRecord()
	return id
}

export const createNewRecord = () => {
	let chosenTemplateId = chosenTemplate.get()
	let id = generateID()
	let template = getTemplate()

	// create object in records
	if (!records[chosenTemplateId]) {
		records[chosenTemplateId] = {}
	}

	let fill = {}

	Object.values(template.layout).forEach(e => {
		if (e.type !== 'templateName' && e.type !== 'label') {
			fill[e.id] = {
				id: e.id,
				content: 'new textbox'
			}
		}
	})

	const getFirstTextbox = () => {
		let layoutElements = Object.values(template.layout)
		if (layoutElements.length < 1) return -1

		let layoutTextboxes = layoutElements.filter(e => e.type === 'textbox')
		if (layoutTextboxes.length < 1) return -1

		return layoutTextboxes[0].id
	}

	records[chosenTemplateId][id] = {
		id,
		parentID: chosenTemplateId,
		name: 'new record to parent ' + template.name,
		nameChained: getFirstTextbox(),
		fill
	}
}

export const updSize = (layoutID, pos, ref) => {
	let size = {
		width: ref.style.width,
		height: ref.style.height
	}
	templates.setSize(layoutID, size)

	updPos(layoutID, pos)
}

export const updPos = (layoutID, pos) => {
	templates.setPos(layoutID, pos)
}

export const editTemplateElementName = (layoutID, value) => {
	templates.editTemplateElementName(layoutID, value)
}

export const editRecordField = (layoutID, recordID, value) => {
	records.editRecordField(layoutID, recordID, value)
}

export const getLayoutItem = (layoutItemID) => {
	return getTemplate().layout[layoutItemID]
}

export const addLayoutItem = (layoutItemType, pos) => {
	let chosenTemplateID = chosenTemplate.get()
	let id = generateID()

	let newItem = {
		id,
		type: layoutItemType,
		name: 'New ' + layoutItemType,
		size: { width: '80px', height: '25px' },
		pos,
		zIndex: 1
	}

	if (layoutItemType === 'image') {
		newItem.size.width = '300px'
		newItem.size.height = '150px'
		newItem.fit = 'cover'
	}

	templates[chosenTemplateID].layout[id] = newItem

	if (layoutItemType === 'templateName' || layoutItemType === 'label') {
		return id
	}

	let templateID = chosenTemplate.get()

	Object.keys(records).forEach(recordGroupID => {
		if (recordGroupID === templateID) {
			Object.keys(records[recordGroupID]).forEach(recordID => {
				records[recordGroupID][recordID].fill[id] = {
					id,
					content: 'New ' + layoutItemType
				}
			})
		}
	})
	return id
}

export const deleteLayoutItem = (layoutItemID) => {

	let chosenTemplateID = chosenTemplate.get()

	delete templates[chosenTemplateID].layout[layoutItemID]

	// find and delete all records
	Object.keys(records[chosenTemplateID]).map(e => {
		Object.keys(records[chosenTemplateID][e].fill).map(k => {
			if (k === layoutItemID) {
				delete records[chosenTemplateID][e].fill[k]
			}
		})
	})
}

export const changeImageFitType = (layoutItemID, fitType) => {

	if (getTemplate().layout[layoutItemID].type !== 'image') {
		console.log('Trying to change fit type for non-image layout element!')
		return
	}
	templates.setImageFitType(layoutItemID, fitType)
}


