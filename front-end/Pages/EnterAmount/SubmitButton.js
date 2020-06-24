import React from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
	Container: {
		height: 75,
	},
	Text: {
		fontSize: 30,
	},
});

export default function () {
	return (
		<View style={{ flex: 1 }}>
			<Button
				contentStyle={styles.Container}
				labelStyle={styles.Text}
				mode='contained'
				onPress={() => console.log('Pressed')}
			>
				SUBMIT PAYMENT
			</Button>
		</View>
	);
}
