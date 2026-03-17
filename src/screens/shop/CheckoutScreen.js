import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppHeader from '../../components/AppHeader';
import CustomButton from '../../components/CustomButton';
import colors from '../../constants/colors';

import { createOrder } from '../../services/shopService';
import { isEmpty } from '../../utils/validators';
import { showMessage } from '../../utils/showMessage';

export default function CheckoutScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('');

const handlePlaceOrder = async () => {
  if (isEmpty(fullName)) {
    showMessage('Validation Error', 'Full name is required');
    return;
  }

  if (isEmpty(address)) {
    showMessage('Validation Error', 'Address is required');
    return;
  }

  if (isEmpty(cardNumber)) {
    showMessage('Validation Error', 'Card number is required');
    return;
  }

  const payload = {
    full_name: fullName,
    address,
    card_number: cardNumber,
    total: 20,
    items: [
      {
        name: 'Calm Mind Journal',
        price: 18,
        quantity: 1,
      },
    ],
  };

  const response = await createOrder(payload);

  if (response?.success) {
    navigation.replace('OrderSuccess');
  }
};

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <AppHeader
            title="Checkout"
            subtitle="Enter your details to complete the purchase."
          />

          <Text style={styles.label}>Full Name</Text>
          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              placeholder="Enter full name"
              placeholderTextColor="rgba(255,255,255,0.45)"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          <Text style={styles.label}>Address</Text>
          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              placeholder="Enter delivery address"
              placeholderTextColor="rgba(255,255,255,0.45)"
              value={address}
              onChangeText={setAddress}
            />
          </View>

          <Text style={styles.label}>Card Number</Text>
          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              placeholder="1234 5678 9012 3456"
              placeholderTextColor="rgba(255,255,255,0.45)"
              value={cardNumber}
              onChangeText={setCardNumber}
              keyboardType="number-pad"
            />
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Order Summary</Text>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Calm Mind Journal</Text>
              <Text style={styles.summaryValue}>$18</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery</Text>
              <Text style={styles.summaryValue}>$2</Text>
            </View>

            <View style={styles.summaryDivider} />

            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>$20</Text>
            </View>
          </View>

          <CustomButton
            title="Place Order"
            onPress={handlePlaceOrder}
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
  label: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 10,
  },
  inputBox: {
    height: 56,
    borderRadius: 18,
    backgroundColor: '#1B2147',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginBottom: 18,
  },
  input: {
    color: colors.white,
    fontSize: 15,
    padding: 0,
  },
  summaryCard: {
    backgroundColor: '#1B2147',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    marginTop: 6,
    marginBottom: 18,
  },
  summaryTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 14,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 14,
  },
  summaryValue: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginVertical: 10,
  },
  totalLabel: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
  totalValue: {
    color: '#FFC83D',
    fontSize: 16,
    fontWeight: '700',
  },
  button: {
    marginTop: 10,
  },
});