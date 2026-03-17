import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppHeader from '../../components/AppHeader';
import colors from '../../constants/colors';
import products from '../../data/productsData';

export default function ShopScreen({ navigation }) {
  return (
    <ScreenWrapper>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <AppHeader
            title="Shop"
            subtitle="Explore wellness products curated for your journey."
          />

          {products.map(item => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.85}
              style={styles.productCard}
              onPress={() => navigation.navigate('ProductDetails', { product: item })}
            >
              <View style={styles.imagePlaceholder}>
                <Text style={styles.imagePlaceholderText}>IMG</Text>
              </View>

              <View style={styles.content}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productDescription}>{item.description}</Text>
                <Text style={styles.price}>{item.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
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
  productCard: {
    backgroundColor: '#1B2147',
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    marginBottom: 14,
    flexDirection: 'row',
  },
  imagePlaceholder: {
    width: 84,
    height: 84,
    borderRadius: 18,
    backgroundColor: '#24305A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  imagePlaceholderText: {
    color: 'rgba(255,255,255,0.45)',
    fontWeight: '700',
  },
  content: {
    flex: 1,
  },
  productName: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  productDescription: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 10,
  },
  price: {
    color: '#FFC83D',
    fontSize: 15,
    fontWeight: '700',
  },
});