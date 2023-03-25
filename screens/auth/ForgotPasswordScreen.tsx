import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useRef, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from 'styled-components/native';
import {RootStackParamList} from '../../navigation/types';
import {Colors} from '../../styles/themes/types';
import TextInput, {TextInputRef} from '../../components/common/TextInput';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../components/common/Button';
import i18n from '../../assets/locale/i18n';
import WrapperAvoidance from '../../components/common/WrapperAvoidance';
import {getAuthYupErrors} from '../../functions/getYupErrors';
import {useAuthContext} from '../../providers/AuthProvider';
import {forgotPasswordSchema} from '../../schemas/forgotPasswordSchema';
import {openInbox} from 'react-native-email-link';

type Props = NativeStackScreenProps<RootStackParamList, 'ForgotPasswordScreen'>;

type FormFields = {
  email: string;
};

const SignInScreen = ({navigation}: Props) => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);

  const sendPasswordResetEmail = useAuthContext().sendPasswordResetEmail;

  const emailRef: TextInputRef = useRef(null);

  const form = useRef<FormFields>({email: ''});
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleGoBackPress = () => {
    navigation.pop();
  };

  const handleOpenEmailAppPress = () => {
    openInbox();
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await forgotPasswordSchema.validate({...form.current}, {abortEarly: false});
      await sendPasswordResetEmail(form.current.email);
      setSent(true);
    } catch (err) {
      if (typeof err === 'string') {
        if (err === 'user-not-found') {
          setErrors(['no-user-record']);
        } else {
          setErrors([err as string]);
        }
      } else {
        setErrors(getAuthYupErrors((err as {inner: {message: string; path: keyof FormFields}[]}).inner).email);
      }
    }
    setLoading(false);
  };

  const handleTryAnotherEmailPress = () => {
    setSent(false);
  };

  if (sent) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'top']}>
        <WrapperAvoidance>
          <View style={styles.container}>
            <View style={styles.topContainer}>
              <Icon name="arrow-left" size={36} color={colors.primary.main} onPress={handleGoBackPress} />
            </View>

            <View style={styles.middleContainer}>
              <Icon name="email-fast" size={70} color={colors.primary.main} style={styles.icon} />
              <Text style={styles.text}>{i18n.t('sent-email-message')}</Text>

              <Button
                minWidth="88%"
                height={50}
                borderRadius={15}
                margin={[10, 0, 0, 0]}
                loading={loading}
                onPress={handleOpenEmailAppPress}>
                {i18n.t('open-email-app')}
              </Button>
            </View>

            <View style={styles.bottomContainer}>
              <Text style={styles.bottomText}>{i18n.t('did-not-receive-email-message')} </Text>
              <Button mode="text" textSize={14} onPress={handleTryAnotherEmailPress}>
                {i18n.t('try-another-email')}
              </Button>
            </View>
          </View>
        </WrapperAvoidance>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'top']}>
      <WrapperAvoidance>
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <Icon name="arrow-left" size={36} color={colors.primary.main} onPress={handleGoBackPress} />
          </View>

          <View style={styles.middleContainer}>
            <Icon name="lock-reset" size={70} color={colors.primary.main} style={styles.icon} />
            <Text style={styles.text}>{i18n.t('reset-email-message')}</Text>
            <TextInput
              ref={emailRef}
              label={`${i18n.t('email-address')}:`}
              width={'90%'}
              keyboardType="email-address"
              left={<Icon name="at" size={25} color={colors.text.light} />}
              onChangeText={text => {
                form.current.email = text;
                emailRef.current?.setNativeProps({text});
                errors.length > 0 && setErrors([]);
              }}
              error={errors[0] ? i18n.t(`errors.${errors[0]}`) : ''}
            />

            <Button minWidth="88%" height={50} borderRadius={15} margin={[10, 0, 0, 0]} loading={loading} onPress={handleSubmit}>
              {i18n.t('send-instructions')}
            </Button>
          </View>

          <View style={styles.bottomContainer} />
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
    text: {
      fontSize: 15,
      fontWeight: '600',
      color: colors.text.main,
      marginBottom: 10,
      marginHorizontal: '6%',
      textAlign: 'center',
    },
    icon: {
      marginBottom: 20,
    },
    topContainer: {
      flexDirection: 'row',
      width: '100%',
      paddingTop: 10,
      paddingLeft: 10,
    },
    middleContainer: {
      width: '100%',
      alignItems: 'center',
    },
    bottomContainer: {
      width: '100%',
      justifyContent: 'center',
      paddingBottom: 20,
    },
    bottomText: {
      fontSize: 14,
      color: colors.primary.main,
      textAlign: 'center',
    },
  });

export default SignInScreen;
