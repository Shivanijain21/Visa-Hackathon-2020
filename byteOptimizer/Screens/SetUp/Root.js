import React from 'react';
import { Button } from 'react-native-paper';
import { Text, View, StyleSheet, Image } from 'react-native';
import ScreenNames from '../Names';
const styles = StyleSheet.create({
	Container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 10,
		paddingLeft: 50,
		paddingRight: 50,
	},
	WelcomeText: {
		color: '#262D9B',
		fontWeight: 'bold',
		fontSize: 30,
		textAlign: 'center',
		marginVertical: 50,
	},
	BodyText: {
		fontSize: 24,
		color: '#FDBB0A',
		fontStyle: 'italic',
		textAlign: 'center',
		paddingTop: 20,
	},
	Button: {
		height: 68,
		backgroundColor: '#FDBB0A',
	},
	Text: {
		fontSize: 28,
	},
});

export default function SetUp({ navigation: { navigate } }) {
	return (
		<View style={styles.Container}>
			<Image
				source={require('./logo.png')}
				style={{ width: 500, height: 100, margin: 20 }}
			/>
			<Text style={styles.BodyText}>Get paid from any where, any time</Text>
			<Text style={styles.WelcomeText}>WELCOME!</Text>
			<Button
				contentStyle={styles.Button}
				labelStyle={styles.Text}
				mode='contained'
				onPress={() => navigate(ScreenNames.InputCredentialsStep1)}
			>
				Start Set Up
			</Button>
		</View>
	);
}
