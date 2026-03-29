import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import CompanyAdminScreen from '../screens/auth/CompanyAdminScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import VerifyCodeScreen from '../screens/auth/VerifyCodeScreen';
import NewPasswordScreen from '../screens/auth/NewPasswordScreen';
import ProfileSetupScreen from '../screens/profile/ProfileSetupScreen';
import ProfileSetupScreen2 from '../screens/profile/ProfileSetupScreen2';

import MoodSelectionScreen from '../screens/profile/MoodSelectionScreen';
import InterestSelectionScreen from '../screens/profile/InterestSelectionScreen';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="CompanyAdmin" component={CompanyAdminScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="VerifyCode" component={VerifyCodeScreen} />
      <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
      <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
      <Stack.Screen name="ProfileSetup2" component={ProfileSetupScreen2} /> 
      <Stack.Screen name="MoodSelection" component={MoodSelectionScreen} />
      <Stack.Screen
        name="InterestSelection"component={InterestSelectionScreen}
      />
    </Stack.Navigator>
  );
}