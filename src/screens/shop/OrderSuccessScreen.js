import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import CustomButton from '../../components/CustomButton';
import colors from '../../constants/colors';

export default function OrderSuccessScreen({ navigation }) {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.iconCircle}>
          <Text style={styles.checkMark}>✓</Text>
        </View>

        <Text style={styles.title}>Order Placed Successfully</Text>
        <Text style={styles.subtitle}>
          Your order has been placed successfully. You can continue exploring the app now.
        </Text>

        <CustomButton
          title="Back to Home"
          onPress={() => navigation.replace('MainTabs')}
          style={styles.button}
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07132A',
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#1B2147',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  checkMark: {
    color: '#FFC83D',
    fontSize: 42,
    fontWeight: '700',
  },
  title: {
    color: colors.white,
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 28,
  },
  button: {
    width: '100%',
  },
});