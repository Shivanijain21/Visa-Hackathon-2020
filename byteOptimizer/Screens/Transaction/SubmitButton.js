import React from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import ScreenNames from '../Names';
import axios from "axios";
import readTag from '../../Helpers/NFCManager';
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

export default function ({ amount, setBusy, navigate }) {
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
		//console.log("****************-------in setupnfc func---------***************");
		// NfcManager.start();
		//console.log("****************-------after start---------***************");
		NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
			//console.log('*********tag***********\n', tag);
			//console.log(tag["ndefMessage"][0].payload);
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
				amount: { amount }
			}
			console.log(data);
			setBusy(true);
			setTimeout(() => {
				setBusy(false);
				navigate(ScreenNames.TransactionSuccessScreen, { amount });
			}, 3000);
		});
	};

	const submitTransaction = async () => {
		// Here we will call our backend service which will then call VISA DIRECT API
		console.log("**********************in button function************************")
		let data = {
			"token": "4895142232120006",
			"amount": "232"
		}
		setBusy(true);
		axios.post('https://fund-transfer.herokuapp.com/fund', data).
			then((res) => {
				console.log("came from backend");
				console.log(res);
				setBusy(false);
				navigate(ScreenNames.TransactionSuccessScreen, { amount });
			});
		console.log('Submitting Transaction ...');
		console.log("reading");

		await setupNFC();
		try {
			console.log("from register tag");
			await NfcManager.registerTagEvent();
			// console.log("********-------data---------*********\n")
			// console.log(data);
		} catch (ex) {
			console.warn('ex', ex);
			NfcManager.unregisterTagEvent().catch(() => 0);
		}
		// console.log(data);
		// Set busy state for 3 seconds
		// setBusy(true);
		// setTimeout(() => {
		// 	setBusy(false);
		// 	navigate(ScreenNames.TransactionSuccessScreen, { amount });
		// }, 3000);

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
