import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import AmountDisplayer from './AmountDisplayer';
import SubmitButton from './SubmitButton';
import KeyPad from './KeyPad';

const styles = StyleSheet.create({
	modalContainer: {
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default function TransactionScreen({ navigation: { navigate } }) {
	const [amount, setAmount] = useState('');
	const [busy, setBusy] = useState(false);

	return (
		<View style={{ flex: 1 }}>
			<AmountDisplayer amount={amount} />
			<KeyPad amount={amount} setAmount={setAmount} />
			<SubmitButton amount={amount} setBusy={setBusy} navigate={navigate} />
			<Portal>
				<Modal
					visible={busy}
					dismissable={false}
					contentContainerStyle={styles.modalContainer}
				>
					<ActivityIndicator size={170} color='#262D9B' />
				</Modal>
			</Portal>
		</View>
	);
}
