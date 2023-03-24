import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from 'styled-components/native';
import {Colors} from '../styles/themes/types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAuthContext} from '../providers/AuthProvider';
import Button from '../components/common/Button';

const LandingScreen = () => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);

  const loggedUser = useAuthContext().user;
  const signOut = useAuthContext().signOutUser;

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'top']}>
      <View style={styles.container}>
        <Icon name="application-brackets" size={50} color={colors.primary.main} />
        <Text style={styles.title}> Welcome {loggedUser?.email}</Text>
        <Button onPress={signOut}>Sign out</Button>
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
