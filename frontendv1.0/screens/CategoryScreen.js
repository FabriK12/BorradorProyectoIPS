import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const CategoryScreen = () => {
	return(
		<View>
			<Text style={styles.text}>
				CategoryScreen
			</Text>
		</View>
	);
};

export default CategoryScreen;

const styles = StyleSheet.create({
  text: {
	fontSize: 30,
	textAlign: "center",
	marginTop: "20%",
  },
});