import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import TryAgainButton from './TryAgainButton';
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
    ErrorText: {
		color: 'red',
		fontWeight: 'bold',
		fontSize: 36,
		paddingTop: 20,
		flex: .45,
	},
	BodyText: {
		fontSize: 24,
		color: '#1A1F71',
		textAlign: 'center',
		paddingBottom: 50,
	},
	Alert: {
		flex: .11,
        paddingBottom: 15,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default function SetUpFailure({ navigation: {navigate } }) {
	return (
		<View style={styles.Container}>
            <Text style={styles.ErrorText}>ERROR!</Text>

			<Button icon="alert" labelStyle={{
				color: 'red',
				margin: 20,
				fontSize: 100,
            }}/>

            <View style={{ paddingBottom: 20 }}>
                <Text style={styles.BodyText}>  
                    Invalid credentials. {"\n"}
                    Please try again.
                </Text>
            </View>
			<View>
				<TryAgainButton navigate={navigate}/>
			</View>
		</View>
	);
}
