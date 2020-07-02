import React from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import ScreenNames from '../Names';
const styles = StyleSheet.create({
	Button: {
		height: 68,
		backgroundColor: '#FDBB0A',
	},
	Text: {
		fontSize: 28,
	},
	Container: {},
});
export default function ({ navigate, userName, password }) {
	const ChecInputs = () => {
		if (userName != '') {
			if (password != '') {
				navigate(ScreenNames.SetUpSuccessScreen);
			} else {
				alert('Please enter password');
			}
		} else {
			alert('Please enter user name');
		}
	};
	return (
		<View style={styles.Container}>
			<Button
				contentStyle={styles.Button}
				labelStyle={styles.Text}
				mode='contained'
				onPress={() => ChecInputs()}
			>
				Submit
			</Button>
		</View>
	);
}
