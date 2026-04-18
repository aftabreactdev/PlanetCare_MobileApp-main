import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabs from './MainTabs';
import WelcomeJournal from '../screens/journaling/WelcomeJournal';
import ShopScreen from '../screens/shop/ShopScreen';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen';
import CartScreen from '../screens/shop/CartScreen';
import CheckoutScreen from '../screens/shop/CheckoutScreen';
import OrderSuccessScreen from '../screens/shop/OrderSuccessScreen';


const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="AddJournal" component={AddJournalScreen} />
      <Stack.Screen name="Pods" component={PodsScreen} />
      <Stack.Screen name="PodDetails" component={PodDetailsScreen} />
      <Stack.Screen name="Shop" component={ShopScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="OrderSuccess" component={OrderSuccessScreen} />
  
    </Stack.Navigator>
  );
}