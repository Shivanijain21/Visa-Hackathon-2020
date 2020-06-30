import React, { useState } from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import ScreenNames from '../Names';
import { Modal, Portal } from 'react-native-paper';

const styles = StyleSheet.create({
	Container: {
		height: 75,
		color: '#262D9B',
	},
	Text: {
		fontSize: 30,
	},
	modalContainer: {
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default function ({ amount, navigate, setAmount }) {
	// Transaction states
	const startTransactionState = {
		state: true,
		waitingText: "Waiting for customer's token ...",
	};

	const sumbitTransactionState = {
		state: false,
		waitingText: 'Submitting transaction ...',
	};

	const [transactionState, setTransactionState] = useState({
		...startTransactionState,
	});
	const [busy, setBusy] = useState(false);

	const startTransaction = () => {
		// *****************************************************
		// TO DO:  ENTER CODE TO RECEIVE TOKEN USING NFC Manager
		// *****************************************************
		setBusy(true);
		setTimeout(() => {
			setBusy(false);
			// Change transaction state to submit payment
			setTransactionState({
				...sumbitTransactionState,
			});
		}, 3000);
	};

	const submitTransaction = () => {
		// ***********************************************************************
		// ENTER AXIOS CALL TO OUR BACKEND SERVICE WHICH WILL CALL VISA DIRECT API
		// ***********************************************************************
		setBusy(true);
		setTimeout(() => {
			setBusy(false);
			// Clear the amount
			setAmount('');
			// Change transaction state back to start transaction
			setTransactionState({
				...startTransactionState,
			});
			// Navigate to the success page
			navigate(ScreenNames.TransactionSuccessScreen, { amount });
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
			{transactionState.state ? (
				<Button
					contentStyle={styles.Container}
					labelStyle={styles.Text}
					mode='contained'
					onPress={() => startTransaction()}
					disabled={!isAmountValid()}
				>
					START TRANSACTION
				</Button>
			) : (
				<Button
					contentStyle={styles.Container}
					labelStyle={styles.Text}
					mode='contained'
					onPress={() => submitTransaction()}
					disabled={!isAmountValid()}
				>
					SUBMIT PAYMENT
				</Button>
			)}
			<Portal>
				<Modal
					visible={busy}
					dismissable={false}
					contentContainerStyle={styles.modalContainer}
				>
					<ActivityIndicator size={170} color='#262D9B' />
					<Text
						style={{
							color: '#262D9B',
							marginTop: 30,
							fontSize: 25,
							fontWeight: 'bold',
						}}
					>
						{transactionState.waitingText}
					</Text>
				</Modal>
			</Portal>
		</View>
	);
}
