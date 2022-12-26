import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import TodayList from "../components/TodayList";
import { SafeAreaView } from "react-native-safe-area-context";

import { todosData } from "../data/task";

const HomeScreen = () => {

	const navigation = useNavigation();

	const getCurrentDate=() => {
		var date = new Date().getDate();
		return date.toString();
	}

	const isComplete=(stateTask) => {
		var state = stateTask.toString() === 'Completado';
		return state;
	}

	const [localData, setLocalData] = React.useState(
		todosData.sort((a, b) => {
			return (isComplete(a.state) - isComplete(b.state));
		})
	)

	const [isHidden, setIsHidden] = React.useState(false);

	const handleHidePress = () => {
		if (isHidden) {
			setIsHidden(false);
			setLocalData(
				todosData.sort((a, b) => {
					return (isComplete(a.state) - isComplete(b.state))
				}));
			return;
		}
		setIsHidden(!isHidden);
		setLocalData(localData.filter(todo => !isComplete(todo.state)));
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>
				Skills progress
			</Text>
			<View>
				<Image
					source={{ uri: 'https://www.nicepng.com/png/full/30-303391_caricature-profile-on-student-show-banner-freeuse-stock.png' }}
					style={styles.pic}
				/>
				<View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
					<Text style={styles.title}>
						Today Tasks
					</Text>
					<TouchableOpacity onPress={handleHidePress}>
						<Text style={{ color: "#3478f6" }}>{isHidden ? "Show Completed":"Hide Completed"}</Text>
					</TouchableOpacity>
				</View>
			</View>
			<View>
				<TodayList todosData={localData.filter(
					todo => todo.date_end.split('-')[2] === getCurrentDate()
				)}/>
			</View>
			<TouchableOpacity
				style={styles.buttonAddTask}
				onPress={() => navigation.navigate("AddTask")}
			>
				<Text style={styles.plusSign}>
					+
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 10,
		paddingTop: 40,
	},
	title: {
		fontSize: 30,
		paddingStart: 10,
		paddingBottom: 10,
		textAlign: "left",
		fontWeight: "bold",
	},
	touch: {
		backgroundColor: "#2E8B57",
		padding: 10,
		marginTop: "20%",
		width: "40%",
		alignSelf: "center",
		borderRadius: 10,
	},
	touchText: {
		fontSize: 15,
		fontWeight: "bold",
		textAlign: "center",
		color: "white",
	},
	pic: {
		width: 50,
		height: 50,
		marginRight: 10,
		borderRadius: 21,
		alignSelf: "flex-end",
	},
	buttonAddTask: {
		width: 60,
		height: 60,
		borderRadius: 41,
		backgroundColor: "#2E8B57",
		position: "absolute",
		bottom: 30,
		right: 20,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: .5,
		shadowRadius: 5,
		elevation: 5,
	},
	plusSign: {
		fontSize: 60,
		color: "white",
		position: "absolute",
		top: -15,
		left: 12,
	}
});