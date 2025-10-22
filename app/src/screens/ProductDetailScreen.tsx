/**
 * Tela de detalhes do produto.
 * Mostra imagem, descrição, preço e permite selecionar quantidade e adicionar ao carrinho.
 */

import React, { useState } from 'react';
import { View, Text, Image, Alert, ImageSourcePropType, Platform } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { products } from '../data/products';
import { QuantityStepper } from '../components/QuantityStepper';
import { Button } from '../components/Button';
import { useCart } from '../state/cart.context';
import { formatCurrency } from '../utils/formatCurrency';
import { colors, spacing, typography, radius } from '../theme';

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
      <View
        style={{
          width: '100%',
          aspectRatio: 16 / 9,
          backgroundColor: colors.surfaceMuted,
          borderRadius: radius.lg,
          marginBottom: spacing.lg,
          overflow: 'hidden',
          // No Web, limite a altura do banner para evitar "zoom" exagerado em telas largas
          ...(Platform.OS === 'web' ? { maxHeight: 420 } : {}),
        }}
      >
        {product.image ? (
          <Image
            source={
              typeof product.image === 'string'
                ? { uri: product.image }
                : (product.image as ImageSourcePropType)
            }
            style={{
              width: '100%',
              height: '100%',
              // Em dispositivos nativos, mantemos um leve zoom para dar impacto visual;
              // no Web, removemos o zoom para evitar cortes agressivos.
              ...(Platform.OS === 'web' ? {} : { transform: [{ scale: 1.05 }] }),
            }}
            // No Web usamos 'contain' para mostrar a imagem inteira; no nativo mantemos 'cover'.
            resizeMode={Platform.OS === 'web' ? 'contain' : 'cover'}
          />
        ) : null}
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={[typography.h2, { color: colors.text, flex: 1, marginRight: spacing.md }]}>
          {product.name}
        </Text>
        <Text style={[typography.h2, { color: colors.text }]}>{formatCurrency(product.price)}</Text>
      </View>

      <Text style={[typography.body, { color: colors.textMuted, marginTop: spacing.sm }]}>
        {product.description}
      </Text>

      <View style={{ marginTop: spacing.xl, alignItems: 'center', gap: spacing.lg }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.surfaceMuted,
            borderRadius: radius.pill,
            paddingHorizontal: spacing.lg,
            paddingVertical: spacing.sm,
          }}
        >
          <QuantityStepper
            value={qtd}
            onDec={() => setQtd(Math.max(1, qtd - 1))}
            onInc={() => setQtd(qtd + 1)}
          />
        </View>

        <Button
          title={`Adicionar (${formatCurrency(product.price * qtd)})`}
          onPress={() => {
            add({
              productId: product.id,
              name: product.name,
              price: product.price,
              quantity: qtd,
              image: product.image,
            });
            Alert.alert('Adicionado', `${product.name} x${qtd} foi adicionado ao carrinho.`);
          }}
        />
      </View>
    </View>
  );
}
