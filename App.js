import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import Language from './src/screens/profile/Language';
export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0B0F2F" />
      <AppNavigator />
      {/* <Language /> */}
    </>
  );
}