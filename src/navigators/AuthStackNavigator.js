import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SigninScreen from '../screens/SigninScreen';
import SignUpScreen from '../screens/SignUpScreen';
import {GoogleSignin} from '@react-native-community/google-signin';
const Stack = createStackNavigator();

const AuthStackNavigator = () => {

  GoogleSignin.configure({
    webClientId: '292771885377-29lce155qleumore60ap58gi7qi07oqi.apps.googleusercontent.com',
  });
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Signin" component={SigninScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
