import React from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import ScreenNames from '../Names';
const styles = StyleSheet.create({
	Button: {
		height: 68,
	},
	Text: {
		fontSize: 28,
	},
});

export default function ({ navigate }) {
	return (
		<View>
			<Button
				contentStyle={styles.Button}
				labelStyle={styles.Text}
				mode='contained'
				onPress={() => {
					navigate(ScreenNames.TransactionScreen);
				}}
			>
				New Transaction
			</Button>
		</View>
	);
}
