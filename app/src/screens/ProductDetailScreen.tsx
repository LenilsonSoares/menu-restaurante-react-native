/**
 * Tela de detalhes do produto.
 * Mostra imagem, descrição, preço e permite selecionar quantidade e adicionar ao carrinho.
 */

import React, { useState } from 'react'; // React e estado local para quantidade
import { View, Text, Image, Alert, ImageSourcePropType, Platform } from 'react-native'; // Componentes de UI e APIs de plataforma
import { RouteProp, useRoute } from '@react-navigation/native'; // Hook para acessar params da rota
import type { RootStackParamList } from '../navigation/RootNavigator'; // Tipagem das rotas
import { products } from '../data/products'; // Dados de produtos
import { QuantityStepper } from '../components/QuantityStepper'; // Seletor de quantidade
import { Button } from '../components/Button'; // Botão primário
import { useCart } from '../state/cart.context'; // Hook do carrinho para adicionar itens
import { formatCurrency } from '../utils/formatCurrency'; // Formatação monetária
import { colors, spacing, typography, radius } from '../theme'; // Tokens de design

type DetailRoute = RouteProp<RootStackParamList, 'ProductDetail'>; // Tipo da rota de detalhe

export default function ProductDetailScreen() { // Tela que exibe dados de um produto
  const route = useRoute<DetailRoute>(); // Acesso aos parâmetros de rota
  const { productId } = route.params; // Extrai id do produto
  const product = products.find(p => p.id === productId); // Busca produto por id
  const [qtd, setQtd] = useState(1); // Estado para quantidade selecionada (mínimo 1)
  const { add } = useCart(); // Ação para adicionar ao carrinho

  if (!product) { // Fallback para caso produto não exista
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
        {product.image ? ( // Renderiza imagem se houver
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

        <Button // Botão para adicionar ao carrinho com total dinâmico
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
