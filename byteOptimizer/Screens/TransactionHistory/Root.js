import React from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { List, Divider } from 'react-native-paper';

const styles = StyleSheet.create({
	Container: {
		padding: 13,
		flex: 1,
	},
	HeaderText: {
		color: '#1A1F71',
		fontWeight: 'bold',
		fontSize: 30,
		marginVertical: 40,
		textAlign: 'center',
	},
	Title: {
		fontSize: 24,
		color: '#262D9B',
	},
	Date: {
		fontSize: 18,
		color: '#FDBB0A',
	},
});
export default function TransactionHistoryScreen({ transactions }) {
	return (
		<ScrollView style={styles.Container}>
			<Text style={styles.HeaderText}>Transaction History</Text>
			{transactions.map((transaction, index) => {
				return (
					<>
						<List.Section key={index}>
							<List.Item
								titleStyle={styles.Title}
								title={transaction.Name}
								description={transaction.Date}
								descriptionStyle={styles.Date}
								right={() => (
									<Text
										style={{
											fontSize: 18,
											color: '#262D9B',
											marginVertical: 13,
										}}
									>
										+ ${transaction.Amount}
									</Text>
								)}
							/>
						</List.Section>
						<Divider />
					</>
				);
			})}
		</ScrollView>
	);
}
