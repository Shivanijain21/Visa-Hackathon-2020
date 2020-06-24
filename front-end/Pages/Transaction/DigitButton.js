import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const styles = StyleSheet.create({
	button: {
		marginVertical: 35,
		marginLeft: 50,
		marginRight: 50,
	},
	text: {
		color: '#FFFF',
		fontSize: 25,
		fontWeight: 'bold',
	},
});

export default function ({ digit, amount, setAmount }) {
	const addDigit = () => {
		if (digit === '.' && (!amount || amount.includes('.'))) {
			console.log('Invalid input');
			return;
		}

		const [wholePart, decimalPart] = amount.split('.');

		if (digit === '<' && amount.length > 0) {
			setAmount(amount.substr(0, amount.length - 1));
			return;
		}
		if (wholePart && wholePart.length === 4) {
			if (digit !== '.' && !amount.includes('.')) {
				console.log('Max whole part reached');
				return;
			}
		}
		if (decimalPart && decimalPart.length === 2) {
			console.log('Max decimal part reached');
			return;
		}
		if (digit !== '<') {
			setAmount(amount + digit);
		}
	};

	return (
		<Button
			contentStyle={styles.button}
			labelStyle={styles.text}
			compact='true'
			mode='text'
			onPress={() => addDigit()}
		>
			{digit}
		</Button>
	);
}
// index=main  sourcetype = vendor_sales/vendor_sales | table AcctID |stats count by AcctID
