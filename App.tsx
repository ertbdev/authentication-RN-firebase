import React from 'react';

import {StatusBar, useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ThemeProvider} from 'styled-components/native';
import LandingScreen from './screens/LandingScreen';
import darkTheme from './styles/themes/darkTheme';
import lightTheme from './styles/themes/lightTheme';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={backgroundStyle.backgroundColor} />
        <LandingScreen />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
