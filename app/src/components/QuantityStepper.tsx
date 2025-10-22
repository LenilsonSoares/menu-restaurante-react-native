/**
 * Controle de quantidade com botões +/−.
 *
 * Props:
 * - value: quantidade atual.
 * - onDec/onInc: callbacks para decrementar/incrementar.
 */
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing, typography, radius } from '../theme';

export function QuantityStepper({ value, onDec, onInc }: { value: number; onDec: () => void; onInc: () => void }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
      <TouchableOpacity onPress={onDec} style={{ paddingHorizontal: spacing.md, paddingVertical: spacing.sm, backgroundColor: colors.surfaceMuted, borderRadius: radius.sm }}>
        <MaterialCommunityIcons name="minus" size={18} color={colors.text} />
      </TouchableOpacity>
      <Text style={[typography.body, { minWidth: 24, textAlign: 'center' }]}>{value}</Text>
      <TouchableOpacity onPress={onInc} style={{ paddingHorizontal: spacing.md, paddingVertical: spacing.sm, backgroundColor: colors.surfaceMuted, borderRadius: radius.sm }}>
        <MaterialCommunityIcons name="plus" size={18} color={colors.text} />
      </TouchableOpacity>
    </View>
  );
}
