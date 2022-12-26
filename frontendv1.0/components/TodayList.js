import * as React from "react";
import { todosData } from "../data/task";
import { FlatList } from "react-native";
import { View, Text } from "react-native";

import Task from "./Task";

export default function TodayList({ todosData }) {
	return (
		<FlatList
			data={todosData}
			keyExtractor={item => item.id.toString()}
			renderItem={
				({item}) => <Task {...item}/>
			}
		/>
	);
}