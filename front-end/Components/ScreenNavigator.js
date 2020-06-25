import React from 'react';
import Transaction from '../Screens/Transaction/Root';
import TransactionSuccess from '../Screens/TransactionSuccess/Root';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ScreenNames from '../Screens/Names';

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
				<Stack.Screen
					name={ScreenNames.TransactionScreen}
					component={Transaction}
				/>
				<Stack.Screen
					name={ScreenNames.TransactionSuccessScreen}
					component={TransactionSuccess}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
