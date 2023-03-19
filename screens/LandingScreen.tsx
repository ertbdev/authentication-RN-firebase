import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from 'styled-components/native';
import i18n from '../assets/locale/i18n';
import {Colors} from '../styles/themes/types';

const LandingScreen = () => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'top']}>
      <View style={styles.container}>
        <Text style={styles.title}>{i18n.t('hello')}</Text>
      </View>
    </SafeAreaView>
  );
};

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background.screen,
    },
    title: {
      fontSize: 24,
      fontWeight: '600',
      color: colors.primary.main,
    },
  });

export default LandingScreen;
