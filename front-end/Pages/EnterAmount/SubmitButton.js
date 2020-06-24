import React, { isValidElement } from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
	Container: {
		height: 75,
	},
	Text: {
		fontSize: 30,
	},
});

export default function ({ amount }) {
	const isAmountValid = () => {
		const [wholePart, decimalPart] = amount.split('.');

		// If amount contains both a whole and decimal part
		if (amount.includes('.')) {
			// either one of them have to be greater than zero
			if (parseInt(wholePart) > 0 || parseInt(decimalPart) > 0) {
				return true;
			}
		} else {
			// else amount only contains whole part which has to be greater than zero
			if (parseFloat(wholePart) > 0) {
				return true;
			}
		}
		return false;
	};
	return (
		<View style={{ flex: 1 }}>
			<Button
				contentStyle={styles.Container}
				labelStyle={styles.Text}
				mode='contained'
				onPress={() => console.log('Pressed')}
				disabled={!isAmountValid()}
			>
				SUBMIT PAYMENT
			</Button>
		</View>
	);
}
