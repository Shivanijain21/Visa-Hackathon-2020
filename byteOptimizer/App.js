import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import ScreenNavigator from './Components/ScreenNavigator';

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
      <ScreenNavigator />
    </PaperProvider>
  );
}
