import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Text, KeyboardEvent, Platform, Keyboard, ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from 'styled-components/native';
import {RootStackParamList} from '../../navigation/types';
import {Colors} from '../../styles/themes/types';
import TextInput, {TextInputRef} from '../../components/common/TextInput';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../components/common/Button';
import i18n from '../../assets/locale/i18n';
import WrapperAvoidance from '../../components/common/WrapperAvoidance';
import {signInSchema} from '../../schemas/signInSchema';
import {getAuthYupErrors} from '../../functions/getYupErrors';
import {useAuthContext} from '../../providers/AuthProvider';
import GoogleLogo from '../../assets/svg/GoogleLogo';

type Props = NativeStackScreenProps<RootStackParamList, 'SignInScreen'>;

type FormFields = {
  email: string;
  password: string;
};

type FormErrors = {
  email: string[];
  password: string[];
  backend?: string;
};

const SignInScreen = ({navigation}: Props) => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);

  const signIn = useAuthContext().signInUser;
  const singInUserUsingGoogle = useAuthContext().singInUserUsingGoogle;

  const emailRef: TextInputRef = useRef(null);
  const passwordRef: TextInputRef = useRef(null);

  const form = useRef<FormFields>({email: '', password: ''});
  const [errors, setErrors] = useState<FormErrors>({email: [], password: [], backend: ''});

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(old => !old);
  };

  const handleSignUpPress = () => {
    navigation.replace('SignUpScreen');
  };

  const handleForgotPasswordPress = () => {
    navigation.navigate('ForgotPasswordScreen');
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await signInSchema.validate({...form.current}, {abortEarly: false});
      await signIn(form.current.email, form.current.password);
    } catch (err) {
      if (typeof err === 'string') {
        setErrors(value => ({...value, backend: err as string}));
      } else {
        setErrors(getAuthYupErrors((err as {inner: {message: string; path: keyof FormFields}[]}).inner));
      }
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      await singInUserUsingGoogle();
    } catch (err) {
      setErrors(value => ({...value, backend: err as string}));
    }
    setGoogleLoading(false);
  };

  useEffect(() => {
    function onKeyboardChange(e: KeyboardEvent) {
      if (Platform.OS === 'ios') {
        const translationValue = (e.startCoordinates?.screenY || 0) - e.endCoordinates.screenY;
        const keyboardHeight = translationValue > 0 ? translationValue : 0;
        setKeyboardOpen(keyboardHeight > 0);
      } else {
        setKeyboardOpen(e.endCoordinates.height > 0);
      }
    }

    if (Platform.OS === 'ios') {
      const subscription = Keyboard.addListener('keyboardWillChangeFrame', onKeyboardChange);
      return () => subscription.remove();
    }

    const subscriptions = [
      Keyboard.addListener('keyboardDidHide', onKeyboardChange),
      Keyboard.addListener('keyboardDidShow', onKeyboardChange),
    ];
    return () => subscriptions.forEach(subscription => subscription.remove());
  }, []);

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
                errors.backend && setErrors(value => ({...value, backend: ''}));
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
                errors.backend && setErrors(value => ({...value, backend: ''}));
              }}
              error={errors.password[0] ? i18n.t(`errors.${errors.password[0]}`) : ''}
            />

            {errors.backend ? <Text style={styles.errorText}>{i18n.t(`errors.${errors.backend}`)}</Text> : null}

            <Button mode="text" textSize={16} margin={[5, 0, 0, 0]} onPress={handleForgotPasswordPress}>
              {i18n.t('forgot-password')}?
            </Button>

            <Button minWidth="88%" height={50} margin={[20, 0, 0, 0]} loading={loading} onPress={handleSubmit}>
              {i18n.t('sign-in')}
            </Button>

            {keyboardOpen ? null : (
              <>
                <Text style={styles.orText}>-- {i18n.t('or')} --</Text>
                <Text style={styles.text}>{i18n.t('sign-in-with')}</Text>
                <Button mode="rounded" buttonColor="#FFF" height={50} margin={[20, 0, 0, 0]} onPress={handleGoogleSignIn}>
                  <GoogleLogo size={26} />
                </Button>
              </>
            )}
          </View>

          {keyboardOpen ? null : (
            <View style={styles.bottomContainer}>
              <Text style={styles.text}>{i18n.t('do-not-have-account')} </Text>
              <Button mode="text" textSize={14} onPress={handleSignUpPress}>
                {i18n.t('sign-up')}
              </Button>
            </View>
          )}
        </View>
      </WrapperAvoidance>
      {googleLoading ? (
        <View style={styles.backdrop}>
          <ActivityIndicator size={100} color={colors.primary.main} />
        </View>
      ) : null}
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
      paddingBottom: 20,
    },
    backdrop: {
      position: 'absolute',
      height: '100%',
      width: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
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
    },
    text: {
      fontSize: 14,
      color: colors.primary.main,
    },
    errorText: {
      fontSize: 14,
      color: colors.error.main,
      width: '88%',
    },
    orText: {
      fontSize: 14,
      color: colors.primary.main,
      textTransform: 'uppercase',
      marginVertical: 20,
    },
  });

export default SignInScreen;
