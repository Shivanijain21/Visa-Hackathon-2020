import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Header from './Components/Header';
import Transaction from './Pages/Transaction/Root';

const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: '#262D9B',
	},
};

export default function App() {
	return (
		<PaperProvider theme={theme}>
			<Header />
			<Transaction />
		</PaperProvider>
	);
}
