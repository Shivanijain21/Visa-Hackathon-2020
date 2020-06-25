import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import HomeButton from './HomeButton';
import Icon from '@mdi/react'
import { mdiCheckCircle } from '@mdi/js';

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
        paddingBottom: 20,
    },
    BodyText: {
        fontSize: 24,
        color: '#1A1F71',
        textAlign: 'center',
        paddingTop: 20,
        paddingBottom: 10,
    }, 
    Circle:{
        width: 100,
        height: 100,
        borderRadius: 100/2,
        backgroundColor: '#08CA1B',
    }
});

export default function TransactionSuccess() {
	return (
		<View style={styles.Container}>
            <Text style = {styles.SuccessText}>
                SUCCESS!
            </Text>

            <View style={styles.Circle}></View>
            
            <Icon path={mdiCheckCircle}/>

            <View style = {{paddingBottom: 40}}>
                <Text style={styles.BodyText}>
                    Transaction of $200.50 was processed successfully.
                </Text>
            </View>

			<HomeButton />

		</View>
	);
}
