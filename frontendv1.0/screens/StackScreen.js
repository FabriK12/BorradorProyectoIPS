import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button, ScrollView } from "react-native";
import { Switch, TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import DateTimePicker from "@react-native-community/datetimepicker";
import { SelectList } from "react-native-dropdown-select-list";

const StackScreen = () => {
	const [name, setName] = React.useState('');
	const [desc, setDesc] = React.useState('');
	const [date, setDate] = React.useState(new Date());
	const [isToday, setIsToday] = React.useState(false);
	const [categorySelected, setCategorySelected] = React.useState('');

	const [mode, setMode] = React.useState('date');
	const [show, setShow] = React.useState(false);

	const data = [
		{ key: '1', value: 'Deportes' },
		{ key: '2', value: 'Lectura' },
		{ key: '3', value: 'Personal' },
		{ key: '4', value: 'Casa' },
	]

	const navigation = useNavigation();
	const addTask = ()=> {
		navigation.goBack();
	}

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate;
		setShow(false);
		setDate(currentDate);
	};

	const date_button = () => {
		var day = date.getDate();
		var month = date.toLocaleString().split(' ')[1];
		var year = date.getFullYear();
		return "" + month + " " + day + ", " + year;
	}

	const showMode = (currentMode) => {
		if (Platform.OS === 'android') {
			setShow(true);
			// for iOS, add a button that closes the picker
		}
		setMode(currentMode);
	};

	const showDatepicker = () => {
		showMode('date');
	};

	return (
		<ScrollView style={styles.container}>
			<Text style={styles.title}>
				Add Task
			</Text>
			<View style={styles.inputContainer}>
				<Text style={styles.inputLabel}>
					Title
				</Text>
				<TextInput
					style={styles.inputText}
					placeholder="Task"
					placeholderTextColor="e3e3e3"
					onChange={(text) => { setName(text) }}
				/>
			</View>
			<View style={styles.inputContainer}>
				<Text style={styles.inputLabel}>
					Desc.
				</Text>
				<TextInput
					style={styles.inputText}
					placeholder="Desc"
					placeholderTextColor="e3e3e3"
					onChange={(text) => { setDesc(text) }}
				/>
			</View>
			<View style={styles.inputContainer}>
				<Text style={styles.inputLabel}>
					Category
				</Text>
				<SelectList
					setSelected={(val) => setCategorySelected(val)}
					data={data}
					save="value"
					placeholder="Select Category"
					search={false}
					boxStyles = {styles.selectBox}
					inputStyles = {styles.selectText}
					dropdownTextStyles = {styles.selectDropText}
				/>
			</View>
			<View style={styles.inputContainer}>
				<Text style={styles.inputLabel}>
					Date
				</Text>
				<TouchableOpacity
					style={styles.buttonDate}
					onPress={showDatepicker}
				>
					<Text style={styles.buttonText}>
						{date_button()}
					</Text>
				</TouchableOpacity>
				{show && !isToday && (
					<DateTimePicker
						testID="dateTimePicker"
						value={date}
						mode={mode}
						is24Hour={true}
						onChange={onChange}
					/>
				)}
			</View>
			<View style={styles.inputContainer}>
				<Text style={styles.inputLabel}>
					Today
				</Text>
				<Switch
					value={isToday}
					onValueChange={(value) => {
						setIsToday(value),
							setShow(value),
							setDate(new Date())
					}}
				/>
			</View>
			<TouchableOpacity
			onPress={addTask}
				style={styles.button}
			>
				<Text style={styles.buttonText + { color: "white" }}>
					Done
				</Text>
			</TouchableOpacity>
		</ScrollView>
	);
};

//			<Text>selected: {date.toLocaleString()}</Text>

export default StackScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F7F8FA',
		paddingTop: 10,
		paddingHorizontal: 20,
	},
	title: {
		fontSize: 30,
		paddingStart: 10,
		paddingBottom: 30,
		textAlign: "left",
		fontWeight: "bold",
	},
	inputContainer: {
		justifyContent: 'space-between',
		flexDirection: "row",
		paddingBottom: 40,
	},
	inputLabel: {
		fontSize: 20,
		fontWeight: '600',
		lineHeight: 24,
	},
	inputText: {
		borderBottomColor: "#a3a3a3",
		borderBottomWidth: 1,
		width: '75%',
	},
	text: {
		fontSize: 30,
		textAlign: "center",
		marginTop: "20%",
	},
	buttonDate: {
		backgroundColor: "#e3e3e3",
		borderRadius: 10,
	},
	buttonText: {
		padding: 5,
		fontSize: 16,
		fontWeight: '500',
		color: "#737373",
	},
	button: {
		marginTop: 30,
		marginBottom: 15,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: "#2E8B57",
		height: 46,
		borderRadius: 11,
	},
	selectBox: {
		backgroundColor: "#e3e3e3",
		borderRadius: 10,
		marginRight: 3,
		borderWidth: 0,
	},
	selectText: {
		fontSize: 16,
		fontWeight: '500',
		color: "#737373",
	},
	selectDropText: {
		fontSize: 13,
		fontWeight: '500',
		color: "#737373",
	},
});