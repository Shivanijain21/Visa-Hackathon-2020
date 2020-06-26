import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import TryAgainButton from './TryAgainButton';
import HomeButton from '../TransactionSuccess/HomeButton';
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
	ErrorText: {
		color: 'red',
		fontWeight: 'bold',
		fontSize: 36,
	},
	BodyText: {
		fontSize: 24,
		color: '#1A1F71',
		textAlign: 'center',
		paddingBottom: 10,
	},
});

export default function TransactionFail({ navigation, route }) {
	return (
		<View style={styles.Container}>
			<Text style={styles.ErrorText}>ERROR!</Text>
			<View>
				<Button
					icon='alert'
					labelStyle={{
						color: 'red',
						fontSize: 150,
					}}
				/>
			</View>
			<View>
				<Text style={styles.BodyText}>
					Transaction unsuccessful.{'\n'}
					Please try again.
				</Text>
			</View>
			<View>
				<TryAgainButton />
				<HomeButton />
			</View>
		</View>
	);
}
