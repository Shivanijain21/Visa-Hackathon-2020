import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const styles = StyleSheet.create({
	Container: {
		flex: 1,
		alignItems: 'center',
		marginTop: 100,
	},

	Bottom: {
		flex: 1,
		justifyContent: 'flex-end',
		marginBottom: 100,
		marginLeft: 200,
	},

	ChildContainer: {
		flexDirection: 'row',
		borderStyle: 'solid',
		borderColor: '#B9B9B9',
		borderWidth: 1,
		padding: 5,
	},

	Text: {
		marginHorizontal: 70,
		color: '#C4C4C4',
		marginVertical: 10,
	},
});

export default function InputCredentialScreen({
	navigation: { navigate },
	credentialName,
	nextPageName,
}) {
	return (
		<View style={styles.Container}>
			<View style={styles.ChildContainer}>
				<Button
					mode='contained'
					onPress={() => {
						console.log('Enter Credential Logic');
					}}
				>
					Choose File
				</Button>
				<Text style={styles.Text}>{credentialName}</Text>
			</View>

			<View style={styles.Bottom}>
				<Button
					labelStyle={{ fontSize: 30 }}
					color='#FDBB0A'
					onPress={() => {
						navigate(nextPageName);
					}}
				>
					Next
				</Button>
			</View>
		</View>
	);
}
