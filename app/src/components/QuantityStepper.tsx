/**
 * Controle de quantidade com botões +/−.
 *
 * Props:
 * - value: quantidade atual.
 * - onDec/onInc: callbacks para decrementar/incrementar.
 */
import React from 'react'; // React para JSX
import { View, Text, TouchableOpacity } from 'react-native'; // Layout, texto e botões
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Ícones de + e −
import { colors, spacing, typography, radius } from '../theme'; // Tokens de design

export function QuantityStepper({ value, onDec, onInc }: { value: number; onDec: () => void; onInc: () => void }) { // Controle de quantidade
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
