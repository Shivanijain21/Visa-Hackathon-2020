import React from 'react';
import { StyleSheet, View } from 'react-native';
import DigitButton from './DigitButton';

const styles = StyleSheet.create({
	Container: {
		backgroundColor: '#FDBB0A',
		flex: 6,
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignContent: 'center',
		justifyContent: 'center',
	},
});

export default function ({ amount, setAmount }) {
	return (
		<View style={styles.Container}>
			{['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '<'].map(
				(number, index) => (
					<DigitButton
						digit={number}
						amount={amount}
						setAmount={setAmount}
						key={index}
					/>
				)
			)}
		</View>
	);
}
