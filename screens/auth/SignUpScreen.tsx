import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from 'styled-components/native';
import {RootStackParamList} from '../../navigation/types';
import {Colors} from '../../styles/themes/types';
import TextInput from '../../components/common/TextInput';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../components/common/Button';
import i18n from '../../assets/locale/i18n';
import WrapperAvoidance from '../../components/common/WrapperAvoidance';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUpScreen'>;

const SignInScreen = ({navigation}: Props) => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(old => !old);
  };
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(old => !old);
  };

  const handleSignUpPress = () => {
    navigation.navigate('SignInScreen');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'top']}>
      <WrapperAvoidance>
        <View style={styles.container}>
          <View style={styles.topContainer} />

          <View style={styles.middleContainer}>
            <Icon name="lock" size={70} color={colors.primary.main} style={styles.icon} />
            <TextInput
              label={`${i18n.t('email-address')}:`}
              width={'90%'}
              keyboardType="email-address"
              left={<Icon name="at" size={25} color={colors.text.light} />}
            />
            <TextInput
              label={`${i18n.t('password')}:`}
              width={'90%'}
              keyboardType="ascii-capable"
              secureTextEntry={!showPassword}
              left={<Icon name="lock" size={25} color={colors.text.light} />}
              right={<Icon name={showPassword ? 'eye-off' : 'eye'} size={25} color={colors.text.light} />}
              onRightPress={toggleShowPassword}
            />

            <TextInput
              label={`${i18n.t('password')}:`}
              width={'90%'}
              keyboardType="ascii-capable"
              secureTextEntry={!showConfirmPassword}
              left={<Icon name="lock" size={25} color={colors.text.light} />}
              right={<Icon name={showConfirmPassword ? 'eye-off' : 'eye'} size={25} color={colors.text.light} />}
              onRightPress={toggleShowConfirmPassword}
            />

            <Button minWidth="88%" height={50} borderRadius={15} margin={[10, 0, 0, 0]}>
              {i18n.t('sign-up')}
            </Button>
          </View>

          <View style={styles.bottomContainer}>
            <Text style={styles.accountText}>{i18n.t('have-account')}? </Text>
            <Pressable onPress={handleSignUpPress}>
              <Text style={styles.signUpText}>{i18n.t('sign-in')}</Text>
            </Pressable>
          </View>
        </View>
      </WrapperAvoidance>
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
      justifyContent: 'space-between',
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
    icon: {
      marginBottom: 20,
    },
    topContainer: {
      width: '100%',
    },
    middleContainer: {
      width: '100%',
      alignItems: 'center',
    },
    bottomContainer: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'center',
      paddingBottom: 20,
    },
    accountText: {
      fontSize: 14,
      color: colors.primary.main,
    },
    signUpText: {
      fontSize: 14,
      fontWeight: '700',
      color: colors.primary.main,
    },
  });

export default SignInScreen;
