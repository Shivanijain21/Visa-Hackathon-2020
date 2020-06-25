import React from 'react';
import { StyleSheet } from 'react-native';
import Transaction from '../Screens/Transaction/Root';
import TransactionSuccess from '../Screens/TransactionSuccess/Root';
import SetUp from '../Screens/SetUp/Root';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function ScreenNavigator() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerStyle: {
						backgroundColor: '#262D9B',
					},
					headerTintColor: '#fff',
				}}
			>
				<Stack.Screen name='Set Up' component={SetUp} />
				<Stack.Screen name='Transaction' component={Transaction} />
				<Stack.Screen
					name='Transaction Success'
					component={TransactionSuccess}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
