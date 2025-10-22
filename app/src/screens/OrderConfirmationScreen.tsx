/**
 * Tela de confirmação do pedido: exibe o código gerado para referência.
 */
import React from 'react';
import { View, Text } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { colors, spacing, typography } from '../theme';

type ConfRoute = RouteProp<RootStackParamList, 'OrderConfirmation'>;

export default function OrderConfirmationScreen() {
  const route = useRoute<ConfRoute>();
  const { orderId } = route.params;
  return (
    <View style={{ flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center', padding: spacing.lg }}>
      <Text style={[typography.h1, { marginBottom: spacing.sm, color: colors.text }]}>Pedido confirmado 🎉</Text>
      <Text style={[typography.body, { color: colors.textMuted }]}>Código do pedido:</Text>
      <Text style={[typography.h3, { marginTop: 4, color: colors.text }]}>{orderId}</Text>
    </View>
  );
}
