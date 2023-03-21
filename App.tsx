import React from 'react';

import {StatusBar, useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {ThemeProvider} from 'styled-components/native';
import RootStack from './navigation/RootStack';
import i18n from './assets/locale/i18n';
import darkTheme from './styles/themes/darkTheme';
import lightTheme from './styles/themes/lightTheme';
import {useTheme} from 'styled-components/native';
import {findBestAvailableLanguage} from 'react-native-localize';

const ThemedStatusBar = ({isDarkMode}: {isDarkMode: boolean}) => {
  const {colors} = useTheme();
  return <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={colors.background.statusBar} />;
};

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const bestAvailableLanguage = findBestAvailableLanguage(['en', 'es', 'pl']);

  i18n.defaultLocale = 'en';
  i18n.locale = bestAvailableLanguage ? bestAvailableLanguage.languageTag : 'en';
  i18n.enableFallback = true;

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <ThemedStatusBar isDarkMode={isDarkMode} />
        <RootStack />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
