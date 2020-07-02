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
	},
	SuccessText: {
		color: '#FDBB0A',
		fontWeight: 'bold',
		fontSize: 40,
		marginBottom: 90,
	},
	BodyText: {
		fontSize: 24,
		color: '#1A1F71',
		textAlign: 'center',
		paddingBottom: 10,
	},
});

export default function SetUpSuccess({ navigation: { navigate } }) {
	return (
		<View style={styles.Container}>
			<Button
				icon='check-circle'
				labelStyle={{
					color: '#08CA1B',
					fontSize: 150,
				}}
			/>
			<Text style={styles.SuccessText}>Setup Complete!</Text>
			<ContinueButton navigate={navigate} />
		</View>
	);
}