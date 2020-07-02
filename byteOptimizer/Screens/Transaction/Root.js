import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { View } from 'react-native';
import AmountDisplayer from './AmountDisplayer';
import Submitter from './Submitter';
import KeyPad from './KeyPad';

export default function TransactionScreen({
	navigation: { navigate },
	transactions,
	setTransactions,
}) {
	const [amount, setAmount] = useState('');

	return (
		<View style={{ flex: 1 }}>
			<AmountDisplayer amount={amount} />
			<KeyPad amount={amount} setAmount={setAmount} />
			<Submitter
				amount={amount}
				setAmount={setAmount}
				navigate={navigate}
				transactions={transactions}
				setTransactions={setTransactions}
			/>
		</View>
	);
}
