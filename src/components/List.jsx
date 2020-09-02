import React, { useState, useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import firebase from './firebase'
import { chosenTemplate, chooseTemplate, chooseRecord, createNewTemplate, createNewRecord, setScreen } from './data'


const List = ({ templates, records }) => {

	const [templateId, setTemplateId] = useState(-1)

	useEffect(() => {
		let firstTemplateId = chosenTemplate.get()
		if (firstTemplateId !== -1) {
			setTemplateId(firstTemplateId)
		} else {
			firstTemplateId = Object.keys(templates)[0]
			if (firstTemplateId) {
				setTemplateId(firstTemplateId)
				chooseTemplate(firstTemplateId)
			}
		}
	}, [templates])

	const gotoEditTemplate = () => {
		setScreen('editTemplate')
	}

	const pickTemplate = (e) => {
		setTemplateId(e.target.value)
		chooseTemplate(e.target.value)
	}

	const createTemplate = () => {
		let newTemplateId = createNewTemplate()
		setTemplateId(newTemplateId)
	}

	const logout = async () => {
		await firebase.signOut()
		setScreen('login')
	}




	return (
		<div>
			<button onClick={logout}>Logout</button>
			{
				templateId === -1 ?
					<div>No templates found</div> :

					<div>
						<select onChange={pickTemplate} value={templateId}>
							{
								Object.keys(templates).map(key => (
									<option
										key={key}
										value={key}
									>
										{templates[key].name}
									</option>
								))
							}
						</select>

						<button onClick={gotoEditTemplate}>Edit template</button>

						<button onClick={createTemplate}>Create new template</button>

						<button onClick={createNewRecord}>Add record</button>

						{
							records[templateId] ?
								Object.keys(records[templateId]).map(key => (

									<div
										style={{ paddingTop: '20px' }}
										key={key}
										onClick={() => {
											chooseRecord(key)
											setScreen('showRecord')
										}}
									>

										<div
											style={{
												display: 'flex',
												justifyContent: 'space-around',
												padding: '10px',
												cursor: 'pointer',
												border: '1px solid green',
												marginBottom: '10px',
												backgroundColor: 'rgba(100, 255, 150, 0.2)'
											}}
										>
											{records[templateId][key].name}
										</div>

									</div>
								)) :
								<p>No records found</p>
						}

					</div>
			}
		</div>
	)
}

export default inject('templates', 'records')(observer(List))
