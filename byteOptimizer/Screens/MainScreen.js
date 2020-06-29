import React from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TransactionScreen from './Transaction/Root';
import HomeScreen from './Home/Root';
import ProfileScreen from './Profile/Root';
import ScreenNames from './Names';
const Tab = createBottomTabNavigator();

const Styles = StyleSheet.create({
	IconSize: {
		fontSize: 100,
	},
});

export default function MainScreen() {
	return (
		<Tab.Navigator
			tabBarOptions={{
				style: {
					backgroundColor: '#262D9B',
				},
				activeTintColor: '#FDBB0A',
				iconStyle: {
					fontSize: 100,
				},
			}}
		>
			<Tab.Screen
				name={ScreenNames.TransactionScreen}
				component={TransactionScreen}
				options={{
					title: '',
					tabBarIcon: ({ color, size }) => (
						<Button icon='coin' color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name={ScreenNames.HomeScreen}
				component={HomeScreen}
				options={{
					title: '',
					tabBarIcon: ({ color, size }) => (
						<Button icon='home' color={color} size={size}></Button>
					),
				}}
			/>
			<Tab.Screen
				name={ScreenNames.ProfileScreen}
				component={ProfileScreen}
				options={{
					title: '',
					tabBarIcon: ({ color, size }) => (
						<Button icon='account-circle' color={color} size={size} />
					),
				}}
			/>
		</Tab.Navigator>
	);
}
