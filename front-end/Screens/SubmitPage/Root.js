import React, { Component } from 'react';
import { Text,TextInput, View, StyleSheet } from 'react-native';
import SubmitButton from './SubmitButton';
import { Button } from 'react-native-paper';

const styles = StyleSheet.create({
	Container: {
		//flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
        justifyContent: 'center',
		paddingTop: 20,
		paddingLeft: 50,
        paddingRight: 50,
	},
});

export default function SubmitPage({ navigation: {navigate } }) {
	return (
        <View style={styles.Container}>
            <View style={{ paddingTop: 80 }}>
                <TextInput
                    style={{ 
                        height: 50,
                        width: 300, 
                        margin: 20,
                        padding: 10,
                        borderColor: 'gray', 
                        borderWidth: 1 
                    }}
                    placeholder = 'Enter UserId'
                />

                <TextInput
                    style={{ 
                        height: 50, 
                        width: 300, 
                        margin: 20,
                        padding: 10,
                        borderColor: 'gray', 
                        borderWidth: 1 
                    }}
                    placeholder = 'Enter Password'
                />

                <View style={{ paddingTop: 200 }}>
                    <SubmitButton navigate={navigate}/>
                </View>
            </View>
        </View>
	);
}