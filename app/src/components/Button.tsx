import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { colors, spacing, typography } from '../theme';

export function Button({ title, onPress }: { title: string; onPress: () => void }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      accessibilityRole="button"
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      style={{ backgroundColor: colors.primary, paddingVertical: spacing.md, borderRadius: 8, alignItems: 'center' }}
    >
      <Text style={[typography.body, { color: colors.white, fontWeight: '700' }]}>{title}</Text>
    </TouchableOpacity>
  );
}
