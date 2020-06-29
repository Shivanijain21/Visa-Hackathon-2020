import React from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
	Button: {
		height: 68,
		backgroundColor: '#FDBB0A',
	},
	Text: {
		fontSize: 28,
	},
});

export default function () {
	return (
		<View style={styles.Container}>
			<Button
				style={{ marginVertical: 20 }}
				contentStyle={styles.Button}
				labelStyle={styles.Text}
				mode='contained'
				onPress={() => console.log('Pressed')}
			>
				Try Again
			</Button>
		</View>
	);
}
