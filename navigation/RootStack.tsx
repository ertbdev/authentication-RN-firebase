import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import LandingScreen from '../screens/LandingScreen';
import Screen1 from '../screens/Screen1';
import {RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={LandingScreen} />
        <Stack.Screen name="Screen1" component={Screen1} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
