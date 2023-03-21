import React from 'react';

import {KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard, Platform} from 'react-native';

interface Props {
  children: JSX.Element;
}

const WrapperAvoidance = ({children}: Props) => {
  const handleKeyboardDismiss = () => {
    Keyboard.dismiss();
  };

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <KeyboardAvoidingView style={{flex: 1, width: '100%'}} behavior={Platform.OS !== 'android' ? 'padding' : undefined}>
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{flexGrow: 1}} showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={handleKeyboardDismiss}>{children}</TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default WrapperAvoidance;
