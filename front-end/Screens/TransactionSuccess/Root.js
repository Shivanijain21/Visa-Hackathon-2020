import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import HomeButton from './HomeButton';
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
		fontSize: 50,
		textAlign: 'center',
	},
	BodyText: {
		fontSize: 24,
		color: '#1A1F71',
		textAlign: 'center',
		paddingHorizontal: 50,
		paddingBottom: 10,
	},
});

export default function TransactionSuccess({
	navigation: { navigate },
	route,
}) {
	return (
		<View style={styles.Container}>
			<View style={{ flex: 0.6 }}>
				<Text style={styles.SuccessText}>SUCCESS!</Text>
				<Button
					icon='check-circle'
					labelStyle={{
						color: '#08CA1B',
						fontSize: 150,
					}}
				/>
				<Text style={styles.BodyText}>
					Transaction of ${route.params.amount} was processed successfully.
				</Text>
			</View>
			<View style={{ flex: 0.2 }}>
				<HomeButton navigate={navigate} />
			</View>
		</View>
	);
}
