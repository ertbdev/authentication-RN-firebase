import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useRef, useState} from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from 'styled-components/native';
import {RootStackParamList} from '../../navigation/types';
import {Colors} from '../../styles/themes/types';
import TextInput, {TextInputRef} from '../../components/common/TextInput';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../components/common/Button';
import i18n from '../../assets/locale/i18n';
import WrapperAvoidance from '../../components/common/WrapperAvoidance';
import {signUpSchema} from '../../schemas/signUpSchema';
import {getAuthYupErrors} from '../../functions/getYupErrors';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUpScreen'>;

type FormFields = {
  email: string;
  password: string;
  confirmPassword: string;
};

type FormErrors = {
  email: string[];
  password: string[];
  confirmPassword: string[];
};

const SignInScreen = ({navigation}: Props) => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);

  const emailRef: TextInputRef = useRef(null);
  const passwordRef: TextInputRef = useRef(null);
  const confirmPasswordRef: TextInputRef = useRef(null);

  const form = useRef<FormFields>({email: '', password: '', confirmPassword: ''});
  const [errors, setErrors] = useState<FormErrors>({email: [], password: [], confirmPassword: []});

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(old => !old);
  };
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(old => !old);
  };

  const handleSignUpPress = () => {
    navigation.replace('SignInScreen');
  };

  const handleSubmit = async () => {
    try {
      await signUpSchema.validate({...form.current}, {abortEarly: false});
    } catch (err) {
      setErrors(getAuthYupErrors((err as {inner: {message: string; path: keyof FormFields}[]}).inner));
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'top']}>
      <WrapperAvoidance>
        <View style={styles.container}>
          <View style={styles.topContainer} />

          <View style={styles.middleContainer}>
            <Icon name="lock" size={70} color={colors.primary.main} style={styles.icon} />
            <TextInput
              ref={emailRef}
              label={`${i18n.t('email-address')}:`}
              width={'90%'}
              keyboardType="email-address"
              left={<Icon name="at" size={25} color={colors.text.light} />}
              onChangeText={text => {
                form.current.email = text;
                emailRef.current?.setNativeProps({text});
                errors.email.length > 0 && setErrors(value => ({...value, email: []}));
              }}
              error={errors.email[0] ? i18n.t(`errors.${errors.email[0]}`) : ''}
            />
            <TextInput
              ref={passwordRef}
              label={`${i18n.t('password')}:`}
              width={'90%'}
              keyboardType="ascii-capable"
              secureTextEntry={!showPassword}
              left={<Icon name="lock" size={25} color={colors.text.light} />}
              right={<Icon name={showPassword ? 'eye-off' : 'eye'} size={25} color={colors.text.light} />}
              onRightPress={toggleShowPassword}
              onChangeText={text => {
                form.current.password = text;
                passwordRef.current?.setNativeProps({text});
                errors.password.length > 0 && setErrors(value => ({...value, password: []}));
              }}
              error={errors.password[0] ? i18n.t(`errors.${errors.password[0]}`) : ''}
            />

            <TextInput
              ref={confirmPasswordRef}
              label={`${i18n.t('password')}:`}
              width={'90%'}
              keyboardType="ascii-capable"
              secureTextEntry={!showConfirmPassword}
              left={<Icon name="lock" size={25} color={colors.text.light} />}
              right={<Icon name={showConfirmPassword ? 'eye-off' : 'eye'} size={25} color={colors.text.light} />}
              onRightPress={toggleShowConfirmPassword}
              onChangeText={text => {
                form.current.confirmPassword = text;
                confirmPasswordRef.current?.setNativeProps({text});
                errors.confirmPassword.length > 0 && setErrors(value => ({...value, confirmPassword: []}));
              }}
              error={errors.confirmPassword[0] ? i18n.t(`errors.${errors.confirmPassword[0]}`) : ''}
            />

            <Button minWidth="88%" height={50} borderRadius={15} margin={[10, 0, 0, 0]} onPress={handleSubmit}>
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
