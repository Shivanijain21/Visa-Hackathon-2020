import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import AmountDisplayer from './AmountDisplayer';
import SubmitButton from './SubmitButton';
import KeyPad from './KeyPad';

export default function TransactionScreen({ navigation: { navigate } }) {
	const [amount, setAmount] = useState('');

	return (
		<View style={{ flex: 1 }}>
			<AmountDisplayer amount={amount} />
			<KeyPad amount={amount} setAmount={setAmount} />
			<SubmitButton amount={amount} setAmount={setAmount} navigate={navigate} />
		</View>
	);
}
