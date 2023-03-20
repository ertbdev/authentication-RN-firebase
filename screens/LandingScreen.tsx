import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from 'styled-components/native';
import {RootStackParamList} from '../navigation/types';
import i18n from '../assets/locale/i18n';
import {Colors} from '../styles/themes/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const LandingScreen = ({navigation}: Props) => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);

  const handleGoToScreen1 = () => {
    navigation.navigate('Screen1');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'top']}>
      <View style={styles.container}>
        <Text style={styles.title}>{i18n.t('hello')}</Text>
        <Text onPress={handleGoToScreen1} style={styles.text}>
          Go to Screen1
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
