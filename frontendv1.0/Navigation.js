import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

//screens
import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingsScreen";
import StackScreen from "./screens/StackScreen";
import CalendarScreen from "./screens/CalendarScreen";
import CategoryScreen from "./screens/CategoryScreen";

import { MaterialCommunityIcons, Entypo, MaterialIcons } from "@expo/vector-icons";

const HomeStackNavigator = createNativeStackNavigator();

function MyStack() {
	return (
		<HomeStackNavigator.Navigator
			initialRouteName="HomeScreen"
		>
			<HomeStackNavigator.Screen
				name="HomeScreen"
				component={HomeScreen}
				options={{
					headerShown: false,
				}}
			/>
			<HomeStackNavigator.Screen
				name="AddTask"
				component={StackScreen}
				options={{
					headerBackTitleVisible: true,
				}}
			/>
		</HomeStackNavigator.Navigator>
	);
}

const Tab = createBottomTabNavigator();

function MyTabs() {
	return (
		<Tab.Navigator
			initialRouteName="Home"
			screenOptions={{
				tabBarActiveTintColor: "#2E8B57",
			}}
		>
			<Tab.Screen
				name="Category"
				component={CategoryScreen}
				options={{
					tabBarLabel: "Categories",
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name="category" size={30} color={color} />
					),
					tabBarBadge: 1,
					headerShown: false,
				}}
			/>
			<Tab.Screen
				name="Home"
				component={MyStack}
				options={{
					tabBarLabel: "Today",
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name="home" color ={color} size={30} />
					),
					tabBarBadge: 3,
					headerShown: false,
				}}
			/>
			<Tab.Screen
				name="Calendar"
				component={CalendarScreen}
				options={{
					tabBarLabel: "Calendar",
					tabBarIcon: ({ color, size }) => (
						<Entypo name="calendar" size={30} color={color} />
					),
					headerShown: false,
				}}
			/>
			<Tab.Screen
				name="Settings"
				component={SettingsScreen}
				options={{
					tabBarLabel: "Settings",
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name="brightness-5" color ={color} size={30} />
					),
					tabBarBadge: 2,
				}}
			/>
		</Tab.Navigator>
	);
}

export default function Navigation() {
	return (
		<NavigationContainer>
			<MyTabs />
		</NavigationContainer>
	)
}