import * as React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

import { Entypo } from '@expo/vector-icons';


export default function CheckTask({
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
		<TouchableOpacity style={isComplete ? styles.checked:styles.unChecked}>
			{isComplete && <Entypo name="check" size={16} color="#FAFAFA" />}
		</TouchableOpacity>
	)
}
const styles = StyleSheet.create({
	checked: {
		width: 25,
		height: 25,
		marginRight: 13,
		borderRadius: 6,
		backgroundColor: "#262626",
		alignItems: "center",
		justifyContent: "center",
		marginLeft: 15,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: .3,
		shadowRadius: 5,
		elevation: 5,
	},
	unChecked: {
		width: 25,
		height: 25,
		marginRight: 13,
		borderColor: "#e8e8e8",
		borderRadius: 6,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		marginLeft: 15,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: .3,
		shadowRadius: 5,
		elevation: 5,
	}
});
