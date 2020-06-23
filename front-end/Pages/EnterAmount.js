import React from 'react';
import { Appbar, Text, Button } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import DigitButton from '../Components/DigitButton';

export default function EnterAmount() {
	return (
		<View>
			{/* App Header */}
			<Appbar.Header>
				<Appbar.BackAction
					onPress={() => {
						console.log('Back button pressed');
					}}
				/>
				<Appbar.Content title='Merchant Name' />
				<Appbar.Action
					icon='account-circle'
					onPress={() => console.log('Pressed archive')}
				/>
			</Appbar.Header>

			{/* Text Amount Container */}
			<View style={styles.AmountContainer}>
				<Text style={styles.AmountText}> $ 0.00 </Text>
			</View>

			{/* Digit Button Container */}
			<View style={styles.DigitsButtonContainer}>
				{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number, index) => (
					<DigitButton digit={number} key={index} />
				))}
			</View>

			{/* Submit Payment Button*/}
			<Button
				contentStyle={styles.SubmitPaymentContainer}
				labelStyle={styles.SubmitPaymentText}
				mode='contained'
				onPress={() => console.log('Pressed')}
			>
				SUBMIT PAYMENT
			</Button>
		</View>
	);
}

const styles = StyleSheet.create({
	DigitsButtonContainer: {
		backgroundColor: '#FDBB0A',
		alignSelf: 'stretch',
		height: 420,
	},

	AmountContainer: {
		alignSelf: 'stretch',
		backgroundColor: '#262D9B',
		height: 210,
		alignItems: 'center',
		justifyContent: 'center',
	},

	AmountText: {
		color: '#FFFF',
		fontSize: 55,
	},

	SubmitPaymentText: {
		fontSize: 30,
	},

	SubmitPaymentContainer: {
		height: 75,
	},
});
