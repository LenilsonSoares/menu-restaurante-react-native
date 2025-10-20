import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '../theme';

export function QuantityStepper({ value, onDec, onInc }: { value: number; onDec: () => void; onInc: () => void }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
      <TouchableOpacity onPress={onDec} style={{ paddingHorizontal: spacing.md, paddingVertical: spacing.sm, backgroundColor: colors.surfaceMuted, borderRadius: 6 }}>
        <Text style={[typography.h3, { lineHeight: 20 }]}>−</Text>
      </TouchableOpacity>
      <Text style={[typography.body, { minWidth: 24, textAlign: 'center' }]}>{value}</Text>
      <TouchableOpacity onPress={onInc} style={{ paddingHorizontal: spacing.md, paddingVertical: spacing.sm, backgroundColor: colors.surfaceMuted, borderRadius: 6 }}>
        <Text style={[typography.h3, { lineHeight: 20 }]}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
