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
import React from 'react';
import { Pressable, Text } from 'react-native';
import { colors, spacing, typography, radius, shadow } from '../theme';

export function Button({ title, onPress }: { title: string; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      android_ripple={{ color: '#ffffff33' }}
      style={({ pressed }) => ([
        { backgroundColor: colors.primary, paddingVertical: spacing.md, borderRadius: radius.md, alignItems: 'center', opacity: pressed ? 0.9 : 1 },
        shadow.sm,
      ])}
    >
      <Text style={[typography.body, { color: colors.white, fontWeight: '700' }]}>{title}</Text>
    </Pressable>
  );
}
