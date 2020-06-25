import React from 'react';
import Transaction from '../Screens/Transaction/Root';
import TransactionSuccess from '../Screens/TransactionSuccess/Root';
import InputCrendetials from '../Screens/InputCredentials/Root';
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
				<Stack.Screen name={ScreenNames.InputCredentialsStep1}>
					{(props) => (
						<InputCrendetials
							{...props}
							credentialName='API Key'
							nextPageName={ScreenNames.InputCredentialsStep2}
						/>
					)}
				</Stack.Screen>
				<Stack.Screen name={ScreenNames.InputCredentialsStep2}>
					{(props) => (
						<InputCrendetials
							{...props}
							credentialName='Shared Secret'
							nextPageName={ScreenNames.InputCredentialsStep3}
						/>
					)}
				</Stack.Screen>
				<Stack.Screen name={ScreenNames.InputCredentialsStep3}>
					{(props) => (
						<InputCrendetials
							{...props}
							credentialName='Certificate'
							nextPageName={ScreenNames.InputCredentialsStep4}
						/>
					)}
				</Stack.Screen>
				<Stack.Screen name={ScreenNames.InputCredentialsStep4}>
					{(props) => (
						<InputCrendetials
							{...props}
							credentialName='Key'
							nextPageName={ScreenNames.InputCredentialsStep5}
						/>
					)}
				</Stack.Screen>
				<Stack.Screen name={ScreenNames.InputCredentialsStep5}>
					{(props) => (
						<InputCrendetials
							{...props}
							credentialName='Client Cert. File'
							nextPageName={ScreenNames.TransactionScreen}
						/>
					)}
				</Stack.Screen>
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
