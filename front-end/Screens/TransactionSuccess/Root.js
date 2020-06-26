import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import HomeButton from './HomeButton';
import { Button } from 'react-native-paper';

const styles = StyleSheet.create({
	Container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		paddingLeft: 50,
		paddingRight: 50,
	},
	SuccessText: {
		color: '#FDBB0A',
		fontWeight: 'bold',
		fontSize: 50,
	},
	BodyText: {
		fontSize: 24,
		color: '#1A1F71',
		textAlign: 'center',
		paddingBottom: 10,
	},
});

export default function TransactionSuccess({ navigation, route }) {
	return (
		<View style={styles.Container}>
			<Text style={styles.SuccessText}>SUCCESS!</Text>

			<View>
				<Button
					icon='check-circle'
					labelStyle={{
						color: '#08CA1B',
						fontSize: 150,
					}}
				/>
			</View>

			<View style={{ paddingBottom: 60 }}>
				<Text style={styles.BodyText}>
					Transaction of $ {route.params.amount} was processed successfully.
				</Text>
			</View>

			<View>
				<HomeButton />
			</View>
		</View>
	);
}
