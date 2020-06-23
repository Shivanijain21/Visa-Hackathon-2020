import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
	Button,
	DefaultTheme,
	Provider as PaperProvider,
} from 'react-native-paper';

import EnterAmount from './Pages/EnterAmount';

const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: '#262D9B',
	},
	text: '#FFFF',
};

export default function App() {
	return (
		<PaperProvider theme={theme}>
			<View>
				<EnterAmount />
			</View>
		</PaperProvider>
	);
}
