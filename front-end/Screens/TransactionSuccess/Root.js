import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import HomeButton from './HomeButton';
import { Button } from 'react-native-paper';

const styles = StyleSheet.create({
	Container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 20,
		paddingLeft: 50,
		paddingRight: 50,
	},
	SuccessText: {
		color: '#FDBB0A',
		fontWeight: 'bold',
		fontSize: 36,
		paddingTop: 10,
		flex: .5,
	},
	BodyText: {
		fontSize: 24,
		color: '#1A1F71',
		textAlign: 'center',
		paddingBottom: 10,
	},
	Circle: {
		flex: .11,
		paddingBottom: 10,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default function TransactionSuccess({ navigation, route }) {
	return (
		<View style={styles.Container}>

			<Text style={styles.SuccessText}>SUCCESS!</Text>

			<View>
				 <Button icon="check-circle" labelStyle={{
                    color: 'green',
                    margin: 20,
                    fontSize: 100,
                }}/>
			</View>

			<View style={{ paddingBottom: 40 }}>
				<Text style={styles.BodyText}>
					Transaction of $ {route.params.amount} was processed successfully.
				</Text>
			</View>

			<View>
				<HomeButton />
			</View>
		</View>
	);
}
