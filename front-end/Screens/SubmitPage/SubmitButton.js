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
    Container:{
    }
});

export default function ({navigate}) {
    const Submit = () => {
		navigate(ScreenNames.SetUpSuccessScreen);
	};
	return (
		<View style={styles.Container}>
			<Button
				contentStyle={styles.Button}
				labelStyle={styles.Text}
				mode='contained'
				onPress={() => Submit()}
			>
				Submit
			</Button>
		</View>
	);
}