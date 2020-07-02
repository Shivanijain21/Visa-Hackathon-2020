import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import TryAgainButton from './TryAgainButton';
import { Button } from 'react-native-paper';

const styles = StyleSheet.create({
	Container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	ErrorText: {
		color: 'red',
		fontWeight: 'bold',
		fontSize: 40,
	},
	BodyText: {
		fontSize: 24,
		color: '#1A1F71',
		textAlign: 'center',
		paddingBottom: 50,
	},
});

export default function SetUpFailure({ navigation: { navigate } }) {
	return (
		<View style={styles.Container}>
			<Text style={styles.ErrorText}>ERROR!</Text>
			<Button
				icon='alert'
				labelStyle={{
					color: 'red',
					margin: 20,
					fontSize: 150,
				}}
			/>
			<Text style={styles.BodyText}>
				Invalid credentials. {'\n'}
				Please try again.
			</Text>
			<TryAgainButton navigate={navigate} />
		</View>
	);
}