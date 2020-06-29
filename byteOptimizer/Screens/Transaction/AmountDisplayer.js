import React from 'react';
import { Text, Surface } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 2,
		backgroundColor: '#262D9B',
		alignItems: 'center',
		justifyContent: 'center',
		elevation: 20,
	},
	text: {
		color: '#FFFF',
		fontSize: 55,
	},
});

export default function ({ amount }) {
	return (
		<Surface style={styles.container}>
			<Text style={styles.text}> $ {amount} </Text>
		</Surface>
	);
}
