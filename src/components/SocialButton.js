import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../constants/colors';

export default function SocialButton({ title, icon, onPress, style }) {
  return (
    <TouchableOpacity activeOpacity={0.8} style={[styles.button, style]} onPress={onPress}>
      {icon ? <Image source={icon} style={styles.icon} resizeMode="contain" /> : null}
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    paddingHorizontal: 16,
  },
  icon: {
    width: 22,
    height: 22,
    marginRight: 10,
  },
  text: {
    color: colors.textDark,
    fontSize: 15,
    fontWeight: '600',
  },
});