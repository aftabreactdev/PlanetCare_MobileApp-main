import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppHeader from '../../components/AppHeader';
import CustomButton from '../../components/CustomButton';
import colors from '../../constants/colors';

export default function CartScreen({ navigation }) {
  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <AppHeader
            title="Cart"
            subtitle="Review your selected items before checkout."
          />

          <View style={styles.cartCard}>
            <Text style={styles.itemName}>Calm Mind Journal</Text>
            <Text style={styles.itemPrice}>$18</Text>
          </View>

          <View style={styles.totalCard}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalPrice}>$18</Text>
          </View>

          <CustomButton
            title="Proceed to Checkout"
            onPress={() => navigation.navigate('Checkout')}
            style={styles.button}
          />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#07132A',
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
  },
  cartCard: {
    backgroundColor: '#1B2147',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    marginBottom: 14,
  },
  itemName: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  itemPrice: {
    color: '#FFC83D',
    fontSize: 15,
    fontWeight: '700',
  },
  totalCard: {
    backgroundColor: '#1B2147',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    marginBottom: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalLabel: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  totalPrice: {
    color: '#FFC83D',
    fontSize: 16,
    fontWeight: '700',
  },
  button: {
    marginTop: 10,
  },
});