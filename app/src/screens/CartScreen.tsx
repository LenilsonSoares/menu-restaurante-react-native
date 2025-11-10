/**
 * Tela do carrinho: lista itens, permite ajustar quantidades, remover e seguir para checkout.
 */
import React from 'react'; // React para JSX
import { View, Text, FlatList, TouchableOpacity } from 'react-native'; // Componentes de layout e interação
import { useNavigation } from '@react-navigation/native'; // Hook de navegação
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'; // Tipagem de navegação stack
import type { RootStackParamList } from '../navigation/RootNavigator'; // Tipos das rotas
import { useCart } from '../state/cart.context'; // Hook do carrinho (estado + ações)
import { QuantityStepper } from '../components/QuantityStepper'; // Controle de incremento/decremento
import { formatCurrency } from '../utils/formatCurrency'; // Formatação de valores monetários
import { colors, spacing, typography } from '../theme'; // Tokens de design

type Nav = NativeStackNavigationProp<RootStackParamList>; // Alias para facilitar uso do hook de navegação

export default function CartScreen() { // Tela que lista itens do carrinho e mostra totais
  const navigation = useNavigation<Nav>(); // Objeto de navegação
  const { items, subtotal, fee, total, increment, decrement, remove } = useCart(); // Estado e casos de uso do carrinho

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: spacing.lg }}> {/* Container da tela */}
      {items.length === 0 ? ( // Condicional: carrinho vazio
        <Text style={[typography.body, { color: colors.textMuted }]}>Seu carrinho está vazio.</Text>
      ) : (
        <>
          <FlatList
            data={items} // Lista de itens
            keyExtractor={(i) => i.productId} // Chave por productId
            ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: colors.border }} />} // Linha separadora
            renderItem={({ item }) => (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}> {/* Linha de item */}
                <View style={{ flex: 1 }}> {/* Info do produto */}
                  <Text style={[typography.body, { fontWeight: '600', color: colors.text }]}>{item.name}</Text>
                  <Text style={[typography.caption, { color: colors.textMuted }]}>{formatCurrency(item.price)}</Text>
                </View>
                <QuantityStepper value={item.quantity} onDec={() => decrement(item.productId)} onInc={() => increment(item.productId)} /> {/* Ajuste de quantidade */}
                <TouchableOpacity onPress={() => remove(item.productId)} style={{ paddingLeft: spacing.md }}> {/* Remover item */}
                  <Text style={{ color: colors.danger }}>Remover</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          <View style={{ borderTopWidth: 1, borderTopColor: colors.border, paddingTop: spacing.md, gap: spacing.xs }}> {/* Totais */}
            <Text style={[typography.body, { color: colors.text }]}>Subtotal: {formatCurrency(subtotal)}</Text>
            {fee > 0 && <Text style={[typography.body, { color: colors.text }]}>Taxa: {formatCurrency(fee)}</Text>} {/* Taxa opcional */}
            <Text style={[typography.h3, { color: colors.text }]}>Total: {formatCurrency(total)}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Checkout')} style={{ backgroundColor: colors.primary, paddingVertical: spacing.md, borderRadius: 8, alignItems: 'center', marginTop: spacing.sm }}> {/* Botão de checkout */}
              <Text style={{ color: colors.white, fontWeight: '700' }}>Ir para o checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}
