import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { products } from '../data/products';
import { QuantityStepper } from '../components/QuantityStepper';
import { Button } from '../components/Button';
import { useCart } from '../state/cart.context';
import { formatCurrency } from '../utils/formatCurrency';
import { colors, spacing, typography } from '../theme';

type DetailRoute = RouteProp<RootStackParamList, 'ProductDetail'>;

export default function ProductDetailScreen() {
  const route = useRoute<DetailRoute>();
  const { productId } = route.params;
  const product = products.find(p => p.id === productId);
  const [qtd, setQtd] = useState(1);
  const { add } = useCart();

  if (!product) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, padding: spacing.lg }}>
        <Text style={[typography.body, { color: colors.textMuted }]}>Produto não encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: spacing.lg }}>
      <View style={{ width: '100%', height: 200, backgroundColor: colors.surfaceMuted, borderRadius: 12, marginBottom: spacing.md }}>
        {product.image ? <Image source={{ uri: product.image }} style={{ width: '100%', height: '100%' }} /> : null}
      </View>
      <Text style={[typography.h2, { color: colors.text }]}>{product.name}</Text>
      <Text style={[typography.body, { color: colors.textMuted, marginTop: spacing.sm }]}>{product.description}</Text>
      <Text style={[typography.h3, { marginTop: spacing.sm, color: colors.text }]}>{formatCurrency(product.price)}</Text>

      <View style={{ marginTop: spacing.lg, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <QuantityStepper value={qtd} onDec={() => setQtd(Math.max(1, qtd - 1))} onInc={() => setQtd(qtd + 1)} />
        <Button
          title={`Adicionar (${formatCurrency(product.price * qtd)})`}
          onPress={() => add({ productId: product.id, name: product.name, price: product.price, quantity: qtd, image: product.image })}
        />
      </View>
    </View>
  );
}
