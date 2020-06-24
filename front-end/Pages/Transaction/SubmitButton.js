import React, { isValidElement } from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
	Container: {
		height: 75,
		color: '#262D9B',
	},
	Text: {
		fontSize: 30,
	},
});

export default function ({ amount, setBusy }) {
	const isAmountValid = () => {
		const [wholePart, decimalPart] = amount.split('.');

		// If amount contains both a whole and decimal part
		if (amount.includes('.')) {
			if (wholePart && decimalPart) {
				if (parseInt(wholePart) > 0 || parseInt(decimalPart) > 0) {
					return true;
				}
			}
		} else {
			// else amount only contains whole part which has to be greater than zero
			if (parseInt(wholePart) > 0) {
				return true;
			}
		}
		return false;
	};

	const submitTransaction = () => {
		// Here we will call our backend service which will then call VISA DIRECT API
		console.log('Submitting Transaction ...');

		// Set busy state for 3 seconds
		setBusy(true);
		setTimeout(() => {
			setBusy(false);
		}, 3000);
	};

	return (
		<View style={{ flex: 1 }}>
			<Button
				contentStyle={styles.Container}
				labelStyle={styles.Text}
				mode='contained'
				onPress={() => submitTransaction()}
				disabled={!isAmountValid()}
			>
				SUBMIT PAYMENT
			</Button>
		</View>
	);
}
