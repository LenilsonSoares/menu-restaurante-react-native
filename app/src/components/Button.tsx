/**
 * Botão primário estilizado.
 *
 * Props:
 * - title: rótulo do botão.
 * - onPress: callback de clique.
 *
 * Acessibilidade:
 * - accessibilityRole="button" e hitSlop para área de toque ampliada.
 */
import React from 'react'; // Necessário para declarar componentes com JSX
import { Pressable, Text } from 'react-native'; // Componentes base de interação e texto
import { colors, spacing, typography, radius, shadow } from '../theme'; // Design tokens centralizados

export function Button({ title, onPress }: { title: string; onPress: () => void }) { // Botão primário reutilizável
  return (
    <Pressable
      onPress={onPress} // Callback para clique/toque
      accessibilityRole="button" // Papel acessível para leitores de tela
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }} // Área de toque expandida
      android_ripple={{ color: '#ffffff33' }} // Efeito ripple no Android
      style={({ pressed }) => ([ // Define estilo com base no estado 'pressed'
        { backgroundColor: colors.primary, paddingVertical: spacing.md, borderRadius: radius.md, alignItems: 'center', opacity: pressed ? 0.9 : 1 }, // Container visual
        shadow.sm, // Sombra sutil
      ])}
    >
  <Text style={[typography.body, { color: colors.white, fontWeight: '700' }]}>{title}</Text>
    </Pressable>
  );
}
