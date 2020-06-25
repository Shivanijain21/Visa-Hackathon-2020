import React from 'react';
import { StyleSheet, View } from 'react-native';
import DigitButton from './DigitButton';

// const styles = StyleSheet.create({
// 	Container: {
// 		backgroundColor: '#FDBB0A',
// 		flex: 6,
// 		flexDirection: 'row',
// 		flexWrap: 'wrap',
// 		alignContent: 'center',
// 		justifyContent: 'center',
// 	},
// });

const styles = StyleSheet.create({
	container: {
		flex: 5,
		backgroundColor: '#FDBB0A',
	},
	row: {
		flex: 1,
		flexDirection: 'row',
	},
});

export default function ({ amount, setAmount }) {
	return (
		// <View style={styles.Container}>
		// 	{['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '<'].map((number, index) => (
		// 		<DigitButton
		// 			digit={number}
		// 			amount={amount}
		// 			setAmount={setAmount}
		// 			key={index}
		// 		/>
		// 	))}
		// </View>
		<View style={styles.container}>
			<View style={styles.row}>
				<DigitButton digit={'1'} amount={amount} setAmount={setAmount} />
				<DigitButton digit={'2'} amount={amount} setAmount={setAmount} />
				<DigitButton digit={'3'} amount={amount} setAmount={setAmount} />
			</View>

			<View style={styles.row}>
				<DigitButton digit={'4'} amount={amount} setAmount={setAmount} />
				<DigitButton digit={'5'} amount={amount} setAmount={setAmount} />
				<DigitButton digit={'6'} amount={amount} setAmount={setAmount} />
			</View>
			<View style={styles.row}>
				<DigitButton digit={'7'} amount={amount} setAmount={setAmount} />
				<DigitButton digit={'8'} amount={amount} setAmount={setAmount} />
				<DigitButton digit={'9'} amount={amount} setAmount={setAmount} />
			</View>
			<View style={styles.row}>
				<DigitButton digit={'.'} amount={amount} setAmount={setAmount} />
				<DigitButton digit={'0'} amount={amount} setAmount={setAmount} />
				<DigitButton digit={'<'} amount={amount} setAmount={setAmount} />
			</View>
		</View>
	);
}
