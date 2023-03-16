import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from 'styled-components/native';
import {RootStackParamList} from '../navigation/types';

import {Colors} from '../styles/themes/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Screen1'>;

const LandingScreen = ({navigation}: Props) => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);

  const handleGoToHome = () => {
    navigation.navigate('Home');
  };
  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'top']}>
      <View style={styles.container}>
        <Text style={styles.title}>Screen1</Text>
        <Text onPress={handleGoToHome} style={styles.text}>
          Go to Home
        </Text>
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
    text: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.primary.main,
      marginTop: 30,
    },
  });

export default LandingScreen;
