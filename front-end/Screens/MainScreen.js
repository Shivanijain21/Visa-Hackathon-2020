import React, { useState } from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TransactionScreen from './Transaction/Root';
import TransactionHistoryScreen from './TransactionHistory/Root';
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
	const [transactions, setTransactions] = useState([
		{
			Name: 'Chris Jung',
			Amount: 250.0,
			Date: 'June 28',
		},
		{
			Name: 'Johan Guzman',
			Amount: 35.67,
			Date: 'May 12',
		},
		{
			Name: 'Latifat Ozoya',
			Amount: 10.99,
			Date: 'May 05',
		},
		{
			Name: 'Mikhail Husyev',
			Amount: 15.99,
			Date: 'April 23',
		},
		{
			Name: 'Saurabh Anand',
			Amount: 50.5,
			Date: 'March 06',
		},
		{
			Name: 'Chris Jung',
			Amount: 470.5,
			Date: 'March 6',
		},
	]);
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
			>
				{(props) => (
					<TransactionScreen
						{...props}
						transactions={transactions}
						setTransactions={setTransactions}
					/>
				)}
			</Tab.Screen>
			<Tab.Screen
				name={ScreenNames.TransactionHistoryScreen}
				options={{
					title: '',
					tabBarIcon: ({ color, size }) => (
						<Button
							icon='history'
							color={color}
							size={size}
							labelStyle={Styles.font}
							contentStyle={Styles.margin}
						/>
					),
				}}
			>
				{(props) => (
					<TransactionHistoryScreen {...props} transactions={transactions} />
				)}
			</Tab.Screen>
		</Tab.Navigator>
	);
}
