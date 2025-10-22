/**
 * Raiz do aplicativo.
 *
 * - Controla splash screen até pré-carregar recursos (imagens).
 * - Envolve a UI com provedores (GestureHandler, SafeArea, CartProvider).
 * - Renderiza o `RootNavigator` com as rotas.
 */
import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import RootNavigator from './src/navigation/RootNavigator';
import { CartProvider } from './src/state/cart.context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { Asset } from 'expo-asset';

// Impede esconder a splash automaticamente até terminarmos o preload
SplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {
  const [ready, setReady] = useState(false);

  const prepare = useCallback(async () => {
    try {
      // Pré-carrega imagens locais usadas nos produtos/telas
      const assets = [
        require('./assets/images/pizza.png'),
        require('./assets/images/hamburguer.png'),
        require('./assets/images/hamburguer1.png'),
        require('./assets/images/refri.png'),
      ];
      await Promise.all(assets.map((m) => Asset.fromModule(m).downloadAsync()));
    } finally {
      setReady(true);
      SplashScreen.hideAsync().catch(() => {});
    }
  }, []);

  useEffect(() => {
    prepare();
  }, [prepare]);

  if (!ready) {
    // Mantém a splash visível enquanto carrega
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <CartProvider>
          <RootNavigator />
          <StatusBar style="auto" />
        </CartProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
