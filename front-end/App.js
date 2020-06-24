import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import EnterAmount from './Pages/EnterAmount';

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
			<EnterAmount />
		</PaperProvider>
	);
}
