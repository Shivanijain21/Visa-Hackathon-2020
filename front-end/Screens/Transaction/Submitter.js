import React, { useState } from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import ScreenNames from '../Names';
import { Dialog, Portal } from 'react-native-paper';

const monthNames = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

const styles = StyleSheet.create({
	Container: {
		height: 80,
		color: '#262D9B',
	},
	Text: {
		fontSize: 30,
	},
	DialogContainer: {
		backgroundColor: '#262D9B',
	},
	DialogTitle: {
		color: '#E5E5E5',
		marginTop: 30,
		fontSize: 25,
		fontWeight: '600',
		textAlign: 'center',
	},
});

export default function ({
	amount = "",
	navigate,
	setAmount,
	transactions,
	setTransactions,
}) {
	// Transaction states
	const tokenWaitingText = 'Waiting for customer ...';
	const submitWaitingText = 'Submitting transaction ...';

	const [waitingText, setWaitingText] = useState(tokenWaitingText);
	const [busy, setBusy] = useState(false);

	const submitTransaction = () => {
		// ***********************************************************************
		// ENTER AXIOS CALL TO OUR BACKEND SERVICE WHICH WILL CALL VISA DIRECT API
		// ***********************************************************************
		setTimeout(() => {
			// Turn off spinner
			setBusy(false);
			// Clear the amount
			setAmount('');
			// Change waiting text for next transaction
			setWaitingText(tokenWaitingText);
			// Adds a new transaction to the transaction history
			const dateNow = new Date();
			setTransactions([
				{
					Name: 'Johan Guzman',
					Amount: parseFloat(amount),
					Date: `${monthNames[dateNow.getMonth()]} ${dateNow.getDate()}`,
				},
				...transactions,
			]);
			// Navigate to the success page
			navigate(ScreenNames.TransactionSuccessScreen, { amount });
		}, 3000);
	};

	const startTransaction = () => {
		// *****************************************************
		// TO DO:  ENTER CODE TO RECEIVE TOKEN USING NFC Manager
		// *****************************************************
		setBusy(true);
		setTimeout(() => {
			// Change waiting text to submit payment
			setWaitingText(submitWaitingText);
			submitTransaction();
		}, 3000);
	};

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

	return (
		<View style={{ flex: 1 }}>
			<Button
				contentStyle={styles.Container}
				labelStyle={styles.Text}
				mode='contained'
				onPress={() => startTransaction()}
				disabled={!isAmountValid()}
			>
				START TRANSACTION
			</Button>
			<Portal>
				<Dialog
					visible={busy}
					dismissable={false}
					style={styles.DialogContainer}
				>
					<View>
						<Dialog.Title style={styles.DialogTitle}>
							{waitingText}
						</Dialog.Title>
						<Dialog.Content>
							<ActivityIndicator size={170} color='#E5E5E5' />
						</Dialog.Content>
					</View>
				</Dialog>
			</Portal>
		</View>
	);
}
