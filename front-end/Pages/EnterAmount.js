import React from 'react';
import { Appbar, Text, Button, Surface } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import DigitButton from '../Components/DigitButton';

export default function EnterAmount() {
	return (
		<View style={{ flex: 1 }}>
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
			<Surface style={styles.AmountContainer}>
				<Text style={styles.AmountText}> $ 0.00 </Text>
			</Surface>

			{/* Digit Button Container */}
			<View style={styles.DigitsButtonContainer}>
				{[1, 2, 3, 4, 5, 6, 7, 8, 9, ' ', 0, '<'].map((number, index) => (
					<DigitButton digit={number} key={index} />
				))}
			</View>

			{/* Submit Payment Button*/}
			<View style={{ flex: 1 }}>
				<Button
					contentStyle={styles.SubmitPaymentContainer}
					labelStyle={styles.SubmitPaymentText}
					mode='contained'
					onPress={() => console.log('Pressed')}
				>
					SUBMIT PAYMENT
				</Button>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	DigitsButtonContainer: {
		backgroundColor: '#FDBB0A',
		flex: 6,
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignContent: 'center',
		justifyContent: 'center',
	},

	AmountContainer: {
		flex: 2,
		backgroundColor: '#262D9B',
		alignItems: 'center',
		justifyContent: 'center',
		elevation: 20,
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
