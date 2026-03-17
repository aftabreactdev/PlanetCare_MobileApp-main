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

export default function ProductDetailsScreen({ route, navigation }) {
  const product = route?.params?.product;

  const handleAddToCart = () => {
    navigation.navigate('Cart');
  };

  return (
    <ScreenWrapper>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <AppHeader
            title={product?.name || 'Product Details'}
            subtitle="Review the item details before adding it to your cart."
          />

          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>PRODUCT IMAGE</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>
              {product?.description || 'No description available.'}
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Price</Text>
            <Text style={styles.price}>{product?.price || '$0'}</Text>
          </View>

          <CustomButton
            title="Add to Cart"
            onPress={handleAddToCart}
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
  imagePlaceholder: {
    height: 220,
    borderRadius: 24,
    backgroundColor: '#24305A',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  imagePlaceholderText: {
    color: 'rgba(255,255,255,0.45)',
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#1B2147',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    marginBottom: 14,
  },
  sectionTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },
  description: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 14,
    lineHeight: 22,
  },
  price: {
    color: '#FFC83D',
    fontSize: 20,
    fontWeight: '700',
  },
  button: {
    marginTop: 10,
  },
});