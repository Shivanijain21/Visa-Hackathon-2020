import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import TryAgainButton from './TryAgainButton';
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
		paddingTop: 10,
		paddingBottom: 20,
		flex: 0.45,
	},
	BodyText: {
		fontSize: 24,
		color: '#1A1F71',
		textAlign: 'center',
		paddingTop: 20,
		paddingBottom: 10,
	},
	Alert: {
		flex: 0.11,
		paddingBottom: 10,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default function TransactionFail({ navigation: { navigate }, route }) {
	return (
		<View style={styles.Container}>
			<Text style={styles.ErrorText}>ERROR!</Text>

			<Button
				icon='alert'
				style={[
					styles.Alert,
					{
						transform: [{ scale: 7 }],
					},
				]}
			/>

			<View style={{ paddingBottom: 10 }}>
				<Text style={styles.BodyText}>
					Transaction unsuccessful.{'\n'}
					Please try again.
				</Text>
			</View>
			<View style={{ flex: 0.2 }}>
				<TryAgainButton navigate={navigate} />
			</View>
		</View>
	);
}