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
		padding: 10,
	},
	ErrorText: {
		color: 'red',
		fontWeight: 'bold',
		fontSize: 36,
		textAlign: 'center',
	},
	BodyText: {
		fontSize: 24,
		color: '#1A1F71',
		textAlign: 'center',
	},
});

export default function TransactionFail({ navigation: { navigate }, route }) {
	return (
		<View style={styles.Container}>
			<View style={{ flex: 0.6 }}>
				<Text style={styles.ErrorText}>ERROR!</Text>
				<Button
					icon='alert'
					labelStyle={{
						color: 'red',
						fontSize: 150,
					}}
				/>
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
