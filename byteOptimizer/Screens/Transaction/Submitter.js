import React, { useState } from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import ScreenNames from '../Names';
import { Dialog, Portal } from 'react-native-paper';
import NfcManager, { NfcEvents } from 'react-native-nfc-manager';
import axios from 'axios';


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

	const submitTransaction = (data) => {
		// ***********************************************************************
		// ENTER AXIOS CALL TO OUR BACKEND SERVICE WHICH WILL CALL VISA DIRECT API
		// ***********************************************************************
		axios.post('https://fund-transfer.herokuapp.com/fund', data).
			then((res) => {
				console.log("success");
				setBusy(false);
				setWaitingText(tokenWaitingText)
				setAmount('');
				const dateNow = new Date();
				setTransactions([
					{
						Name: 'Johan Guzman',
						Amount: parseFloat(amount),
						Date: `${monthNames[dateNow.getMonth()]} ${dateNow.getDate()}`,
					},
					...transactions,
				]);
				navigate(ScreenNames.TransactionSuccessScreen, { amount });
			}).catch((err) => {
				console.log(err);
				setBusy(false);
				setAmount('');
				navigate(ScreenNames.TransactionFailureScreen);
			});
		// setTimeout(() => {
		// 	// Turn off spinner
		// 	setBusy(false);
		// 	// Clear the amount
		// 	setAmount('');
		// 	// Change waiting text for next transaction
		// 	setWaitingText(tokenWaitingText);
		// 	// Adds a new transaction to the transaction history
		// 	const dateNow = new Date();
		// 	setTransactions([
		// 		{
		// 			Name: 'Johan Guzman',
		// 			Amount: parseFloat(amount),
		// 			Date: `${monthNames[dateNow.getMonth()]} ${dateNow.getDate()}`,
		// 		},
		// 		...transactions,
		// 	]);
		// 	// Navigate to the success page
		// 	navigate(ScreenNames.TransactionSuccessScreen, { amount });
		// }, 3000);
	};
	function setupNFC() {

		NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {

			let pay = tag["ndefMessage"][0].payload;
			pay = pay.slice(3, pay.length)
			pay = String.fromCharCode(...pay)
			console.log("********-------START-------*********\n")
			console.log(pay + "\n")
			console.log("********-------END---------*********\n")
			console.log("Printing pay::   " + pay);
			NfcManager.setAlertMessageIOS('I got your tag!');
			NfcManager.unregisterTagEvent().catch(() => 0);
			let data = {
				token: pay,
				amount
			}
			console.log(data);
			submitTransaction(data);

			// setTimeout(() => {
			// 	setBusy(false);
			// 	navigate(ScreenNames.TransactionSuccessScreen, { amount });
			// }, 3000);
		});
	};
	const startTransaction = async () => {
		// *****************************************************
		// TO DO:  ENTER CODE TO RECEIVE TOKEN USING NFC Manager
		// *****************************************************

		setBusy(true);
		await setupNFC();
		try {
			console.log("from register tag");
			await NfcManager.registerTagEvent();
		} catch (ex) {
			console.warn('ex', ex);
			NfcManager.unregisterTagEvent().catch(() => 0);
		}
		// setTimeout(() => {
		// 	// Change waiting text to submit payment
		// 	setWaitingText(submitWaitingText);
		// 	submitTransaction();
		// }, 3000);
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
