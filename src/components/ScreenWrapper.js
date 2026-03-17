import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import colors from '../constants/colors';

export default function ScreenWrapper({ children, style }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={colors.backgroundDark} />
      <View style={[styles.container, style]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundDark,
  },
  container: {
    flex: 1,
    backgroundColor: colors.backgroundDark,
  },
});