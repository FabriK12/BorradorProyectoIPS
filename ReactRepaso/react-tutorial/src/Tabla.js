import React, { Component } from 'react'
import './App.css'

const TablaHeader = () => {
	return(
		<thead>
			<tr>
			<th>Name</th>
			<th>Job</th>
			</tr>
		</thead>
	)
}

const TablaBody = (props) => {
	const rows = props.characterData.map((row, index) => {
		return (
			<tr key={index}>
				<td>{row.name}</td>
				<td>{row.job}</td>
				<td>
					<button onClick={() => props.removeCharacter(index)}>Remove</button>
				</td>
			</tr>
		)
	})

	return <tbody>{rows}</tbody>
}

const Table = (props) => {
	const { characterData, removeCharacter } = props

	return (
		<table>
			<TablaHeader />
			<TablaBody characterData={characterData} removeCharacter={removeCharacter}/>
		</table>
	)
}

export default Table