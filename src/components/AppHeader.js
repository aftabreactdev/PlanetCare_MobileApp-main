import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../constants/colors';

export default function AppHeader({
  title,
  subtitle,
  rightText,
  onRightPress,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>

      {rightText ? (
        <TouchableOpacity onPress={onRightPress} style={styles.rightButton}>
          <Text style={styles.rightText}>{rightText}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  left: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    color: colors.white,
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 6,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 14,
    lineHeight: 22,
  },
  rightButton: {
    minWidth: 44,
    minHeight: 44,
    borderRadius: 22,
    backgroundColor: '#1B2147',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  rightText: {
    color: '#FFC83D',
    fontSize: 13,
    fontWeight: '700',
  },
});