import React, { useState } from 'react';
import { Button } from 'react-native-paper';
import { Text, View, StyleSheet } from 'react-native';
// import Icon from '@mdi/react';
// import { mdiCheckCircle } from '@mdi/js';

const styles = StyleSheet.create({
	Container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 10,
		paddingLeft: 50,
		paddingRight: 50,
	},
	WelcomeText: {
		color: '#262D9B',
		fontWeight: 'bold',
		fontSize: 55,
		textAlign: 'center',
	},
	BodyText: {
		fontSize: 24,
		color: '#FDBB0A',
		fontStyle: 'italic',
		textAlign: 'center',
		paddingTop: 20,
		paddingBottom: 100,
	},
	Button: {
		height: 68,
		backgroundColor: '#FDBB0A',
	},
	Text: {
		fontSize: 28,
    },
});

export default function SetUp({ navigation: { navigate } }) {
	return (
        <View style={styles.Container}>
            <Text style={styles.WelcomeText}>WELCOME!</Text>
			<Text style={styles.BodyText}>Insert slogan here</Text>
			<Button
				contentStyle={styles.Button}
				labelStyle={styles.Text}
				mode='contained'
				onPress={() => console.log('Pressed')}
			>
				Click to Setup
			</Button>
        </View>	
	);
}