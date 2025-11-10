/**
 * Botão de atalho para o carrinho com badge numérica.
 * Exibe o total de unidades no carrinho quando > 0.
 */
import React from 'react'; // Necessário para JSX
import { TouchableOpacity, Text, View } from 'react-native'; // Componentes básicos de UI
import { colors } from '../theme'; // Paleta de cores centralizada
import { useCart } from '../state/cart.context'; // Hook para acessar quantidade total de itens

export function CartBadge({ onPress }: { onPress: () => void }) { // Botão que mostra ícone de carrinho e badge numérica
  const { count } = useCart(); // Obtém contagem total de unidades no carrinho
  return (
    <TouchableOpacity
      onPress={onPress} // Callback acionado ao tocar
      accessibilityRole="button" // Indica semanticamente que é um botão para leitores de tela
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }} // Aumenta área clicável além do conteúdo visível
      style={{ paddingHorizontal: 12, paddingVertical: 6 }} // Espaçamento interno para toque confortável
    >
      <View style={{ position: 'relative' }}>
        <Text style={{ fontSize: 18 }}>🛒</Text>
        {count > 0 && ( // Renderiza badge somente se houver itens
          <View
            style={{
              position: 'absolute', // Posiciona sobre o ícone
              right: -6, // Ajuste horizontal para alinhamento visual
              top: -6, // Ajuste vertical
              backgroundColor: colors.danger, // Cor de destaque (ex.: vermelho)
              borderRadius: 8, // Cantos arredondados para formato de pílula
              paddingHorizontal: 6, // Espaço lateral interno
              minWidth: 16, // Garante largura mínima para dígitos simples
            }}
          >
            <Text style={{ color: colors.white, fontSize: 12, fontWeight: '700', textAlign: 'center' }}>{count}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
