import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { useCart } from '../state/cart.context';
import { QuantityStepper } from '../components/QuantityStepper';
import { formatCurrency } from '../utils/formatCurrency';
import { colors, spacing, typography } from '../theme';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function CartScreen() {
  const navigation = useNavigation<Nav>();
  const { items, subtotal, fee, total, increment, decrement, remove } = useCart();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: spacing.lg }}>
      {items.length === 0 ? (
        <Text style={[typography.body, { color: colors.textMuted }]}>Seu carrinho está vazio.</Text>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(i) => i.productId}
            ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: colors.border }} />}
            renderItem={({ item }) => (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}>
                <View style={{ flex: 1 }}>
                  <Text style={[typography.body, { fontWeight: '600', color: colors.text }]}>{item.name}</Text>
                  <Text style={[typography.caption, { color: colors.textMuted }]}>{formatCurrency(item.price)}</Text>
                </View>
                <QuantityStepper value={item.quantity} onDec={() => decrement(item.productId)} onInc={() => increment(item.productId)} />
                <TouchableOpacity onPress={() => remove(item.productId)} style={{ paddingLeft: spacing.md }}>
                  <Text style={{ color: colors.danger }}>Remover</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          <View style={{ borderTopWidth: 1, borderTopColor: colors.border, paddingTop: spacing.md, gap: spacing.xs }}>
            <Text style={[typography.body, { color: colors.text }]}>Subtotal: {formatCurrency(subtotal)}</Text>
            {fee > 0 && <Text style={[typography.body, { color: colors.text }]}>Taxa: {formatCurrency(fee)}</Text>}
            <Text style={[typography.h3, { color: colors.text }]}>Total: {formatCurrency(total)}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Checkout')} style={{ backgroundColor: colors.primary, paddingVertical: spacing.md, borderRadius: 8, alignItems: 'center', marginTop: spacing.sm }}>
              <Text style={{ color: colors.white, fontWeight: '700' }}>Ir para o checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}
