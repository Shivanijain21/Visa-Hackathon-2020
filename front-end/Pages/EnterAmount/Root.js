import React, { useState } from 'react';
import { View } from 'react-native';

import Header from './Header';
import AmountDisplayer from './AmountDisplayer';
import SubmitButton from './SubmitButton';
import KeyPad from './KeyPad';

export default function EnterAmount() {
	const [amount, setAmount] = useState('');

	return (
		<View style={{ flex: 1 }}>
			<Header />
			<AmountDisplayer amount={amount} />
			<KeyPad amount={amount} setAmount={setAmount} />
			<SubmitButton />
		</View>
	);
}
