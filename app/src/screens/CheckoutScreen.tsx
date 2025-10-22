/**
 * Tela de checkout: coleta dados básicos, método de entrega e pagamento,
 * e confirma o pedido gerando um código simples.
 */
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { useCart } from '../state/cart.context';
import { formatCurrency } from '../utils/formatCurrency';
import { colors, spacing, typography } from '../theme';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function CheckoutScreen() {
  const navigation = useNavigation<Nav>();
  const { total, clear } = useCart();
  const [nome, setNome] = useState('');
  const [entrega, setEntrega] = useState<'local' | 'retirada' | 'delivery'>('local');
  const [pagamento, setPagamento] = useState<'dinheiro' | 'cartao' | 'pix'>('dinheiro');

  function confirmar() {
    if (!nome.trim()) {
      Alert.alert('Atenção', 'Informe seu nome.');
      return;
    }
    const orderId = Math.random().toString(36).slice(2, 8).toUpperCase();
    clear();
  navigation.navigate('OrderConfirmation', { orderId });
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: spacing.lg, gap: spacing.md }}>
      <Text style={[typography.h3, { color: colors.text }]}>Seus dados</Text>
      <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={{ borderWidth: 1, borderColor: colors.border, borderRadius: 8, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, backgroundColor: colors.surface }} />

      <Text style={[typography.h3, { marginTop: spacing.sm, color: colors.text }]}>Entrega</Text>
      <View style={{ flexDirection: 'row', gap: spacing.sm }}>
        {(['local', 'retirada', 'delivery'] as const).map(t => (
          <TouchableOpacity key={t} onPress={() => setEntrega(t)} style={{ paddingVertical: spacing.sm, paddingHorizontal: spacing.lg, borderRadius: 999, backgroundColor: entrega === t ? colors.primary : colors.surfaceMuted }}>
            <Text style={{ color: entrega === t ? colors.white : colors.text }}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={[typography.h3, { marginTop: spacing.sm, color: colors.text }]}>Pagamento</Text>
      <View style={{ flexDirection: 'row', gap: spacing.sm }}>
        {(['dinheiro', 'cartao', 'pix'] as const).map(m => (
          <TouchableOpacity key={m} onPress={() => setPagamento(m)} style={{ paddingVertical: spacing.sm, paddingHorizontal: spacing.lg, borderRadius: 999, backgroundColor: pagamento === m ? colors.primary : colors.surfaceMuted }}>
            <Text style={{ color: pagamento === m ? colors.white : colors.text }}>{m}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ marginTop: 'auto', gap: spacing.sm }}>
        <Text style={[typography.body, { color: colors.text }]}>Total: <Text style={{ fontWeight: '700' }}>{formatCurrency(total)}</Text></Text>
        <TouchableOpacity onPress={confirmar} style={{ backgroundColor: colors.primary, paddingVertical: spacing.md, borderRadius: 8, alignItems: 'center' }}>
          <Text style={{ color: colors.white, fontWeight: '700' }}>Confirmar pedido</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
