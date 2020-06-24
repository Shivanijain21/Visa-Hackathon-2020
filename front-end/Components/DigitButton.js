import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

export default function DigitButton(props) {
	return (
		<Button
			contentStyle={styles.button}
			labelStyle={styles.text}
			compact='true'
			mode='text'
			onPress={() => {
				console.log(props.digit);
			}}
		>
			{props.digit}
		</Button>
	);
}

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

// index=main  sourcetype = vendor_sales/vendor_sales | table AcctID |stats count by AcctID
