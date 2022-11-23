import React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

const Tarea = (props) => {
	return (
		<View style={styles.item}>
			<View style={styles.itemLeft}>
				<TouchableOpacity style={styles.square}></TouchableOpacity>
				<View style={styles.itemDesc}>
					<Text style={styles.itemTitleText}>{props.text}</Text>
					<Text style={styles.itemText}>{props.desc}</Text>
					<Text style={styles.itemText}>Hasta el: {props.fec}</Text>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	item: {
		backgroundColor: '#FFA',
		padding: 15,
		borderRadius: 5,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 5
	},
	itemLeft: {
		flexDirection: 'row',
		alignItems: 'center',
		flexWrap: 'wrap'
	},
	square: {
		backgroundColor: '#FCA',
		borderRadius: 5,
		width: 30,
		height: 30,
		marginRight: 25
	},
	itemText: {
		fontSize: 15,
	},
	itemTitleText: {
		fontSize: 18,
	},
})

export default Tarea