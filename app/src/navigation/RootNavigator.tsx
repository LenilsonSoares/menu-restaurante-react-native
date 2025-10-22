/**
 * Navegação raiz do app (React Navigation - Native Stack).
 * Define as rotas principais e título/ações de cabeçalho.
 */
import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import CategoryScreen from '../screens/CategoryScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import OrderConfirmationScreen from '../screens/OrderConfirmationScreen';
import { CartBadge } from '../components/CartBadge';

/**
 * Tipagem dos parâmetros de rota.
 */
export type RootStackParamList = {
  Home: undefined;
  Category: { categoryId: string; title: string };
  ProductDetail: { productId: string };
  Cart: undefined;
  Checkout: undefined;
  OrderConfirmation: { orderId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Tema leve: mantém cores padrão, alterando apenas o background.
 */
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFFFFF',
  },
};

export default function RootNavigator() {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }: any) => ({
            title: 'Cardápio',
            headerRight: () => <CartBadge onPress={() => navigation.navigate('Cart')} />,
          })}
        />
        <Stack.Screen
          name="Category"
          component={CategoryScreen}
          options={({ route, navigation }: any) => ({
            title: route.params.title,
            headerRight: () => <CartBadge onPress={() => navigation.navigate('Cart')} />,
          })}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={({ navigation }: any) => ({
            title: 'Detalhe do prato',
            headerRight: () => <CartBadge onPress={() => navigation.navigate('Cart')} />,
          })}
        />
        <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Carrinho' }} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ title: 'Checkout' }} />
        <Stack.Screen
          name="OrderConfirmation"
          component={OrderConfirmationScreen}
          options={{ title: 'Pedido confirmado' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
