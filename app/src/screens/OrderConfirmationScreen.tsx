/**
 * Tela de confirmação do pedido: exibe o código gerado para referência.
 */
import React from 'react'; // React para JSX
import { View, Text } from 'react-native'; // Componentes básicos de layout e texto
import { RouteProp, useRoute } from '@react-navigation/native'; // Hook para obter parâmetros da rota
import type { RootStackParamList } from '../navigation/RootNavigator'; // Tipos das rotas
import { colors, spacing, typography } from '../theme'; // Tokens de estilo

type ConfRoute = RouteProp<RootStackParamList, 'OrderConfirmation'>; // Tipo para a rota de confirmação

export default function OrderConfirmationScreen() { // Tela simples que mostra o código do pedido
  const route = useRoute<ConfRoute>(); // Acesso aos parâmetros da rota
  const { orderId } = route.params; // Código do pedido gerado no checkout
  return (
    <View style={{ flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center', padding: spacing.lg }}>
      <Text style={[typography.h1, { marginBottom: spacing.sm, color: colors.text }]}>Pedido confirmado 🎉</Text>
      <Text style={[typography.body, { color: colors.textMuted }]}>Código do pedido:</Text>
      <Text style={[typography.h3, { marginTop: 4, color: colors.text }]}>{orderId}</Text>
    </View>
  );
}
