import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Button } from 'react-native-paper';
const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
	buttonContainer: {
		flex: 1,
	},
	buttonStyle: {
		width: width / 3,
		height: height / 7,
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
			style={styles.buttonContainer}
			contentStyle={styles.buttonStyle}
			labelStyle={styles.text}
			compact='true'
			mode='text'
			onPress={() => addDigit()}
		>
			{digit}
		</Button>
	);
}
