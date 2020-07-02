import React from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import ScreenNames from '../Names';
import axios from "axios";
import NfcManager, { NfcEvents } from 'react-native-nfc-manager';


const styles = StyleSheet.create({
	Container: {
		height: 75,
		color: '#262D9B',
	},
	Text: {
		fontSize: 30,
	},
});

export default function ({ amount = "", setBusy, navigate }) {
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
			axios.post('https://fund-transfer.herokuapp.com/fund', data).
				then((res) => {
					console.log("success");
					setBusy(false);
					navigate(ScreenNames.TransactionSuccessScreen, { amount });
				}).catch((err) => {
					console.log(err);
					setBusy(false);
					navigate(ScreenNames.TransactionFailureScreen);
				});
			// setTimeout(() => {
			// 	setBusy(false);
			// 	navigate(ScreenNames.TransactionSuccessScreen, { amount });
			// }, 3000);
		});
	};

	const submitTransaction = async () => {
		// Here we will call our backend service which will then call VISA DIRECT API
		console.log("**********************in button function************************")
		setBusy(true);
		console.log('Submitting Transaction ...');
		console.log("reading");
		await setupNFC();
		try {
			console.log("from register tag");
			await NfcManager.registerTagEvent();
		} catch (ex) {
			console.warn('ex', ex);
			NfcManager.unregisterTagEvent().catch(() => 0);
		}

	};

	return (
		<View style={{ flex: 1 }}>
			<Button
				contentStyle={styles.Container}
				labelStyle={styles.Text}
				mode='contained'
				onPress={() => submitTransaction()}
				disabled={!isAmountValid()}
			>
				SUBMIT PAYMENT
			</Button>
		</View>
	);
}
