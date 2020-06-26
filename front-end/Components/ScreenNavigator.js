import React from 'react';
import { Text } from 'react-native';
import { Button } from 'react-native-paper';
import Transaction from '../Screens/Transaction/Root';
import TransactionSuccess from '../Screens/TransactionSuccess/Root';
import SetUp from '../Screens/SetUp/Root';
import SetUpSuccess from '../Screens/SetUpSuccess/Root';
import SetUpFailure from '../Screens/SetUpFailure/Root';
import TransactionFailure from '../Screens/TransactionFail/Root';
import InputCredentials from '../Screens/InputCredentials/Root';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ScreenNames from '../Screens/Names';
import InputCredentialScreens from '../Screens/InputCredentials/ScreenObjects';
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
				{/* Render Input Credential Screens */}
				{InputCredentialScreens.map((page, index) => {
					return (
						<Stack.Screen
							name={page.Name}
							options={{
								title: 'Back',
								headerTitleStyle: {
									fontWeight: 'bold',
								},
								gestureDirection: 'horizontal-inverted',
								headerRight: () => (
									<Text
										style={{
											color: '#FFFF',
											margin: 20,
											fontSize: 18,
											fontStyle: 'italic',
										}}
									>
										Step {page.step} out of 6
									</Text>
								),
							}}
						>
							{(props) => (
								<InputCredentials
									key={index}
									{...props}
									credentialName={page.Credential}
									nextPageName={page.NextPage}
								/>
							)}
						</Stack.Screen>
					);
				})}
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
					options={{
						title: 'Merchant Name',
						headerRight: () => (
							<Button
								labelStyle={{
									color: '#FFFF',
									margin: 20,
									fontSize: 30,
								}}
								icon='account-circle'
								onPress={() => {
									console.log('Navigate to profile page');
								}}
							></Button>
						),
					}}
					component={Transaction}
				/>
				<Stack.Screen
					name={ScreenNames.TransactionSuccessScreen}
					options={{ title: '' }}
					component={TransactionSuccess}
				/>
				<Stack.Screen
					name={ScreenNames.TransactionFailureScreen}
					options={{ title: '' }}
					component={TransactionFailure}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
