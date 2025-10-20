import React from 'react';
import { StatusBar } from 'expo-status-bar';
import RootNavigator from './src/navigation/RootNavigator';
import { CartProvider } from './src/state/cart.context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CartProvider>
        <RootNavigator />
        <StatusBar style="auto" />
      </CartProvider>
    </GestureHandlerRootView>
  );
}
