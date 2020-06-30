import React from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TransactionScreen from './Transaction/Root';
import HomeScreen from './Home/Root';
import ScreenNames from './Names';
const Tab = createBottomTabNavigator();

const Styles = StyleSheet.create({
	font: {
		fontSize: 30,
	},
	margin: {
		marginTop: 15,
	},
});

export default function MainScreen() {
	return (
		<Tab.Navigator
			tabBarOptions={{
				activeTintColor: '#FDBB0A',
				tabStyle: {
					backgroundColor: '#262D9B',
				},
			}}
		>
			<Tab.Screen
				name={ScreenNames.TransactionScreen}
				component={TransactionScreen}
				options={{
					title: '',
					tabBarIcon: ({ color, size }) => (
						<Button
							icon='coin'
							color={color}
							size={size}
							labelStyle={Styles.font}
							contentStyle={Styles.margin}
						/>
					),
				}}
			/>
			<Tab.Screen
				name={ScreenNames.HomeScreen}
				component={HomeScreen}
				options={{
					title: '',
					tabBarIcon: ({ color, size }) => (
						<Button
							icon='home'
							color={color}
							size={size}
							labelStyle={Styles.font}
							contentStyle={Styles.margin}
						/>
					),
				}}
			/>
		</Tab.Navigator>
	);
}
