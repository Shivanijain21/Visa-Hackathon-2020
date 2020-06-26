import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ContinueButton from './ContinueButton';
import { Button } from 'react-native-paper';

const styles = StyleSheet.create({
	Container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 20,
		paddingLeft: 50,
        paddingRight: 50,
	},
	SuccessText: {
		color: '#FDBB0A',
		fontWeight: 'bold',
		fontSize: 36,
		paddingTop: 10,
		flex: .5,
	},
	BodyText: {
		fontSize: 24,
		color: '#1A1F71',
		textAlign: 'center',
		paddingBottom: 10,
	},
	Circle: {
		flex: .11,
        paddingBottom: 10,
        paddingLeft: 17,
        paddingTop: 10,
		flexDirection: 'column',
		alignItems: 'center',
        justifyContent: 'center',
	},
});

export default function SetUpSuccess({ navigation: {navigate } }) {
	return (
		<View style={styles.Container}>
			<View>
				<Button icon="check-circle" style={[styles.Circle, {
                    transform: [{scale: 9}]
				}]}/>
			</View>

			<Text style={styles.SuccessText}>Setup Complete!</Text>

			<View>
				<ContinueButton navigate={navigate}/>
			</View>
		</View>
	);
}
