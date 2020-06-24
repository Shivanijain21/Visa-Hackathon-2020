import { Appbar } from 'react-native-paper';
import React from 'react';

export default function Header() {
	return (
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
	);
}
