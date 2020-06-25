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
    Container:{
    }
});

export default function () {
	return (
		<View style={styles.Container}>
			<Button
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