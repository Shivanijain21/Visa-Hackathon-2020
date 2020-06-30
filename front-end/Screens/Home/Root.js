import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	Container: {
	},
	HeaderText: {
		color: '#1A1F71',
		fontWeight: 'bold',
		fontSize: 30,
		marginTop: 40,
		textAlign: 'center',
	},
	Title: {
		fontSize: 24,
		color: '#262D9B',
		paddingLeft: 20,
		paddingTop: 30,	
	},
	Date: {
		fontSize: 18,
		color: '#FDBB0A',
		paddingLeft: 20,	
	},
});
export default function HomeScreen() {
	return( 
		<View style={styles.Container}>
			<Text style={styles.HeaderText}>Transaction History</Text>
			<Text style={styles.Title}> Chris Jung 
				<Text style={styles.Title}>                    +$250.00 </Text>  {/* 20 spaces */}
				<Text style={styles.Date}> {'\n'} March 06 </Text>
			</Text>
			<Text style={styles.Title}> Johan Guzman 
				<Text style={styles.Title}>            +$35.67 </Text>  {/* 12 spaces */}
				<Text style={styles.Date}> {'\n'} March 06 </Text>
			</Text>
			<Text style={styles.Title}> Latifat Ozoya 
				<Text style={styles.Title}>               +$10.99 </Text>  {/* 15 spaces */}
				<Text style={styles.Date}> {'\n'} April 23 </Text>
			</Text>
			<Text style={styles.Title}> Mikhail Husyev 
				<Text style={styles.Title}>            +$15.99 </Text>  {/* 12 spaces */}
				<Text style={styles.Date}> {'\n'} May 05 </Text>
			</Text>
			<Text style={styles.Title}> Saurabh Anand 
				<Text style={styles.Title}>            +$50.50 </Text>  {/* 12 spaces */}
				<Text style={styles.Date}> {'\n'} May 12 </Text>
			</Text>
			<Text style={styles.Title}> Shivani Jain 
				<Text style={styles.Title}>                  +$470.50 </Text>  {/* 18 spaces */}
				<Text style={styles.Date}> {'\n'} June 28 </Text>
			</Text>
		</View>

	);
}
