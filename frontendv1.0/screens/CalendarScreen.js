import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const CalendarScreen = () => {
	return(
		<View>
			<Text style={styles.text}>
				CalendarScreen
			</Text>
		</View>
	);
};

export default CalendarScreen;

const styles = StyleSheet.create({
  text: {
	fontSize: 30,
	textAlign: "center",
	marginTop: "20%",
  },
});