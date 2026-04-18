import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/onboarding/SplashScreen';
import WelcomeScreen from '../screens/onboarding/WelcomeScreen';
import RoleSelectionScreen from '../screens/onboarding/RoleSelectionScreen';
import WriteJournal from '../screens/journaling/WriteJournal';

const Stack = createNativeStackNavigator();

export default function OnboardingStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Role" component={RoleSelectionScreen} />
      <Stack.Screen name="WriteJournal" component={WriteJournal} />
    </Stack.Navigator>
  );
}