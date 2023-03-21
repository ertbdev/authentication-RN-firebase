import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from 'styled-components/native';
import {RootStackParamList} from '../../navigation/types';
import {Colors} from '../../styles/themes/types';
import TextInput from '../../components/common/TextInput';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../components/common/Button';
import i18n from '../../assets/locale/i18n';

type Props = NativeStackScreenProps<RootStackParamList, 'SignInScreen'>;

const SignInScreen = ({navigation}: Props) => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(old => !old);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'top']}>
      <View style={styles.container}>
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

        <Button minWidth="88%" height={50} borderRadius={15} margin={[10, 0, 0, 0]}>
          {i18n.t('sign-in')}
        </Button>
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
    icon: {
      marginBottom: 20,
    },
  });

export default SignInScreen;
