import React from 'react';
import { Text } from 'react-native';
import TransactionSuccess from '../Screens/TransactionSuccess/Root';
import SetUp from '../Screens/SetUp/Root';
import SetUpSuccess from '../Screens/SetUpSuccess/Root';
import SetUpFailure from '../Screens/SetUpFailure/Root';
import TransactionFailure from '../Screens/TransactionFail/Root';
import InputCredential from '../Screens/InputCredentials/InputCrendential.js';
import InputCredentialScreens from '../Screens/InputCredentials/ScreenObjects';
import SubmitPage from '../Screens/SubmitPage/Root';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ScreenNames from '../Screens/Names';
import MainScreen from '../Screens/MainScreen';
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
				}}>
				<Stack.Screen
					name={ScreenNames.SetUp}
					options={{ title: '' }}
					component={SetUp}
				/>
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
										}}>
										Step {page.step} out of 4
                  </Text>
								),
							}}>
							{props => (
								<InputCredential
									key={index}
									{...props}
									credentialName={page.Credential}
									credentialType={page.Type}
									nextPageName={page.NextPage}
								/>
							)}
						</Stack.Screen>
					);
				})}
				<Stack.Screen
					name={ScreenNames.SubmitPageScreen}
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
								}}>
								Step 4 out of 4
              </Text>
						),
					}}
					component={SubmitPage}
				/>
				<Stack.Screen
					name={ScreenNames.SetUpSuccessScreen}
					options={{ title: '' }}
					component={SetUpSuccess}
				/>
				<Stack.Screen
					name={ScreenNames.SetUpFailureScreen}
					options={{ title: '' }}
					component={SetUpFailure}
				/>
				<Stack.Screen
					name={ScreenNames.MainScreen}
					component={MainScreen}
					options={{ title: '' }}
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
