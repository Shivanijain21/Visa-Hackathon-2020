import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

export default function DigitButton(props) {
	return (
		<Button
			compact='true'
			mode='text'
			m
			onPress={() => {
				console.log(props.digit);
			}}
		>
			{props.digit}
		</Button>
	);
}
