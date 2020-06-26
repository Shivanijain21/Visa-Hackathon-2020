import React from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
	Button: {
		height: 68,
	},
	Text: {
		fontSize: 28,
	},
});

export default function () {
	return (
		<View>
			<Button
				contentStyle={styles.Button}
				labelStyle={styles.Text}
				mode='contained'
				onPress={() => console.log('Pressed')}
			>
				Return Home
			</Button>
		</View>
	);
}
