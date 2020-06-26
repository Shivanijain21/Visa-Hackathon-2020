import React from 'react';
import Transaction from '../Screens/Transaction/Root';
import TransactionSuccess from '../Screens/TransactionSuccess/Root';
import SetUp from '../Screens/SetUp/Root';
import SetUpSuccess from '../Screens/SetUpSuccess/Root';
import SetUpFailure from '../Screens/SetUpFailure/Root';
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
					name={ScreenNames.SetUp}
					component={SetUp}
				/>
				<Stack.Screen
					name={ScreenNames.SetUpSuccessScreen}
					component={SetUpSuccess}
				/>
				<Stack.Screen
					name={ScreenNames.SetUpFailureScreen}
					component={SetUpFailure}
				/>
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
