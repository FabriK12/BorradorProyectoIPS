import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import CheckTask from './CheckTask';

export default function Task({
	id,
	title,
	desc,
	date_init,
	date_end,
	state,
	category,
}){
	const isComplete = state.toString() === 'Completado';
	return (
		<View style={styles.container}>
			<CheckTask 
				id={id}
				state={state}
			/>
			<View>
				<Text style={
					isComplete ? [styles.text, {
						textDecorationLine: 'line-through',
						color: "#73737340",
					}]
					:styles.text
				}>{
						title
					}
				</Text>
				<Text style={
					isComplete ? [styles.date, {
						textDecorationLine: 'line-through',
						color: "#73737340",
					}]
					:styles.date
				}>{date_end} | {category}</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 20,
		flexDirection: "row",
		alignItems: "center"
	},
	text: {
		fontSize: 15,
		fontWeight: '500',
		color: "#737373",
	},
	date: {
		fontSize: 13,
		color: "#a3a3a3",
		fontWeight: '500',
	}
});